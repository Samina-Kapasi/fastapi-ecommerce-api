from fastapi import FastAPI, Depends, HTTPException
from database import Base, engine, SessionLocal
from models import Product, Cart, User
from schemas import ProductCreate, Update_ProductCreate, CreateCart, Update_Cart, CreateUser
from sqlalchemy.orm import session
from fastapi.responses import JSONResponse
from security import hash_password

app=FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db=SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {
        "message":"FastAPI connected with MYSQL"
    }


# Product Management

@app.post("/product")
def create_product(product:ProductCreate, db:session=Depends(get_db)):

    new_product=Product(
        name = product.name,
        description = product.description,
        price = product.price ,
        stock = product.stock,
        category = product.category
    )

    db.add(new_product)
    db.commit()

    return JSONResponse(status_code=201, content={"message":"Product created successfully"})

@app.get("/products")
def view_products(db:session=Depends(get_db)):

    view_product=db.query(Product).all()

    return view_product

@app.get("/products/{product_id}")
def product_by_id(product_id:int, db:session=Depends(get_db)):

    product=db.query(Product).filter(Product.id==product_id).first()

    if not product:
        raise HTTPException(status_code=400, detail="product not found")
    
    return product

@app.delete("/products/{product_id}")
def delete_product( product_id:int ,db:session=Depends(get_db)):

    del_product=db.query(Product).filter(product_id==Product.id).first()

    if not del_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(del_product)
    db.commit()

    return JSONResponse(status_code=200, content={"message":"Product deleted successfully"})

@app.put("/product/{product_id}")
def update_product( product_id : int, product:Update_ProductCreate, db:session=Depends(get_db)):

    prod=db.query(Product).filter(product_id==Product.id).first()

    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_prod= product.model_dump(exclude_unset=True)

    for key, value in update_prod.items():
        setattr(prod,key,value)

    db.commit()
    db.refresh(prod)

    return JSONResponse(status_code=200, content={"message":"Product updated successfully"})

@app.get("/search/{product_name}")
def search(product_name:str, db:session=Depends(get_db)):

    name=db.query(Product).filter(Product.name.ilike(f"%{product_name}%")).all()

    if not name:
        raise HTTPException(status_code=404, detail="No product found")
    
    return name

@app.get("/filter")
def filter_product(product_name:str = None ,product_category:str = None , min_price: float= None, max_price: float = None,sort: str = None, page : int = 1, limit : int = 10, db:session=Depends(get_db)):

    query=db.query(Product)

    if product_name:
        query = query.filter(Product.name.ilike(f"%{product_name}%"))

    if product_category:
        query = query.filter(Product.category.ilike(f"%{product_category}%"))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    #sorting
    if sort=="price_low":
        query=query.order_by(Product.price.asc())
    elif sort=="price-high":
        query=query.order_by(Product.price.desc())

    #pagination
    offset=(page - 1) * limit
    query= query.offset(offset).limit(limit)

    products= query.all() 


    if not products:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return products

# Cart Management

@app.post("/cart/add")
def add_to_cart(cart: CreateCart, db:session=Depends(get_db)):

    product=db.query(Product).filter(
        Product.id==cart.product_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if cart.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
    
    if cart.quantity > product.stock:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    existing_cart=db.query(Cart).filter(
        Cart.product_id==cart.product_id
    ).first()

    if existing_cart:
        existing_cart.quantity += cart.quantity

        if existing_cart.quantity > product.stock:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        
        db.commit()
        db.refresh(existing_cart)

        return JSONResponse(status_code=200, content="Cart successfully updated")
    if not existing_cart:
        cart_items= Cart(
            product_id=cart.product_id,
            quantity=cart.quantity
        )

        db.add(cart_items)
        db.commit()
        db.refresh(cart_items)

        return JSONResponse(
            status_code=201,
            content={
                "message":"Product added to cart",
                "cart_id": cart_items.id
            }
        )

@app.get("/cart/get")
def get_cart(db:session=Depends(get_db)):

    cart_items=db.query(Cart).all()

    if not cart_items:
        raise HTTPException(status_code=404, detail="Cart is empty")
    
    response= []

    for items in cart_items:

        product= db.query(Product).filter(
            Product.id==items.product_id
        ).first()

        response.append({
            "cart_id":items.id,
            "product_name":product.name,
            "price":product.price,
            "Quantity":items.quantity
        })
    return response

@app.delete("/cart/{cart_id}")
def delete_cart(cart_id:int, db:session=Depends(get_db)):

    del_cart=db.query(Cart).filter(
        Cart.id==cart_id
    ).first()

    if not del_cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    db.delete(del_cart)
    db.commit()

    return JSONResponse(status_code=204, content="Cart deleted successfully")

@app.put("/cart/{cart_id}")
def update_cart(cart_id:int,cart:Update_Cart, db:session=Depends(get_db)):

    cart_items=db.query(Cart).filter(
        Cart.id==cart_id
    ).first()

    if not cart_items:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    update_cart_items=cart.model_dump(exclude_unset=True)

    if "quantity" in update_cart_items:

        product=db.query(Product).filter(
            Product.id==cart_items.product_id
        ).first()

        if update_cart_items["quantity"]<=0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than zero")
        
        if update_cart_items["quantity"] >= product.stock:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        
    for key, value in update_cart_items.items():
        setattr(cart_items, key, value)

    db.commit()
    db.refresh(cart_items)

    return JSONResponse(status_code=200, content="Cart updated successfully")

@app.post("/register")
def register(user:CreateUser, db:session=Depends(get_db)):

    existing_user=db.query(User).filter(
        User.email==user.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already registered")
    
    new_user=User(
        name = user.name,
        email = user.email,
        password = hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return JSONResponse(status_code=201, content="User Registered successfully")
