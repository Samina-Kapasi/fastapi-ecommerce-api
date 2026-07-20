from fastapi import FastAPI, Depends, HTTPException
from database import Base, engine, get_db
from models import Product, Cart, User, Order, Order_items
from schemas import ProductCreate, Update_ProductCreate, CreateCart, Update_Cart, CreateUser, UserLogin, Create_Order
from sqlalchemy.orm import session
from fastapi.responses import JSONResponse
from security import hash_password, verify_password
from auth import create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


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
        category = product.category,
        image = product.image
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
def add_to_cart(cart: CreateCart, current_user:User=Depends(get_current_user), db:session=Depends(get_db)):

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
        Cart.user_id==current_user.id,
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
            user_id=current_user.id,
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
def get_cart(current_user=Depends(get_current_user),db:session=Depends(get_db)):

    cart_items=db.query(Cart).filter(
        Cart.user_id==current_user.id
    ).all()

    if not cart_items:
        return []
    
    response= []

    for items in cart_items:

        product= db.query(Product).filter(
            Product.id==items.product_id
        ).first()

        response.append({
            "cart_id":items.id,
            "User_name":current_user.name,
            "product_name":product.name,
            "price":product.price,
            "Quantity":items.quantity,
            "image": product.image
        })
    return response

@app.delete("/cart/{cart_id}")
def delete_cart(cart_id:int, current_user:User = Depends(get_current_user),db:session=Depends(get_db)):

    del_cart=db.query(Cart).filter(
        Cart.id==cart_id,
        Cart.user_id==current_user.id
    ).first()

    if not del_cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    db.delete(del_cart)
    db.commit()

    return JSONResponse(status_code=204, content={
        "message":"Cart deleted successfully"
        })

@app.put("/cart/{cart_id}")
def update_cart(cart_id:int,cart:Update_Cart,current_user:User=Depends(get_current_user), db:session=Depends(get_db)):

    cart_items=db.query(Cart).filter(
        Cart.id==cart_id,
        Cart.user_id==current_user
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
        
        if update_cart_items["quantity"] > product.stock:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        
    for key, value in update_cart_items.items():
        setattr(cart_items, key, value)

    db.commit()
    db.refresh(cart_items)

    return JSONResponse(status_code=200, content={
        "message": "Cart updated successfully"
        })

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

    return JSONResponse(status_code=201, content={
        "message":"User Registered successfully"
    })

@app.post("/login")
def login(form_user:OAuth2PasswordRequestForm=Depends(), db:session=Depends(get_db)):

    db_user=db.query(User).filter(
        User.email==form_user.username
    ).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    verify_token=verify_password(
        form_user.password, db_user.password
    )

    if not verify_token:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    access_token =create_access_token(
        data={
            "sub":str(db_user.id)
        }
    )

    return {
        "access_token":access_token,
        "token_type":"bearer"
    }

@app.get("/Logged-in_user")
def login_users(current_user:User=Depends(get_current_user), db:session=Depends(get_db)):

    total_orders=db.query(Order).filter(
        Order.user_id==current_user.id
    ).count()

    cart_items=db.query(Cart).filter(
        Cart.user_id==current_user.id
    ).count()

    return {
        "id":current_user.id,
        "name":current_user.name,
        "email":current_user.email,
        "total_orders":total_orders,
        "cart_items":cart_items
    }


@app.post("/order/add")
def place_order(current_user:User=Depends(get_current_user),db:session=Depends(get_db)):

    cart_items=db.query(Cart).filter(
        Cart.user_id==current_user.id
    ).all()

    if not cart_items:
        raise HTTPException(status_code=404, detail="Cart is empty" )
    
    total_price=0

    for items in cart_items:

        product=db.query(Product).filter(
            Product.id==items.product_id
        ).first()

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        if items.quantity > product.stock:
            raise HTTPException(status_code=400, detail="Insufficient Stock")

        total_price += product.price * items.quantity

        product.stock -= items.quantity

    new_order = Order(
        user_id= current_user.id,
        total_price= total_price,
        status= "Pending"
    )

    db.add(new_order)

    db.commit()

    db.refresh(new_order)

    for item in cart_items:

        product = db.query(Product).filter(
        Product.id == item.product_id
        ).first()

        order_items=Order_items(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_items)
    
    for item in cart_items:
        db.delete(item)

    db.commit()

    return {
        "message":"Order placed successfully",
        "order_id":new_order.id,
        "price": new_order.total_price,
        "date": new_order.created_at
    }

@app.get("/order/get")
def get_order(current_user=Depends(get_current_user), db:session=Depends(get_db)):

    orders=db.query(Order).filter(
        Order.user_id==current_user.id
    ).all()

    if not orders:
        raise HTTPException(status_code=404, detail="Order not found")
    
    response=[]

    for items in orders:

        
        response.append({
            "order_id":items.id,
            "user_name":items.user.name,
            "total_price":items.total_price,
            "status":items.status,
            "created_at":items.created_at
        })

    return response

@app.get("/orders/{order_id}")
def get_order_id(order_id:int , current_user=Depends(get_current_user), db:session=Depends(get_db)):
    
    order_product=db.query(Order).filter(
        Order.id==order_id,
        Order.user_id==current_user.id
    ).first()

    if not order_product:
        raise HTTPException(status_code=404, detail="Order not found")

    order_items=db.query(Order_items).filter(
        Order_items.order_id==order_id
    ).all()

    responses=[]

    for items in order_items:

        product=db.query(Product).filter(
            Product.id==items.product_id
        ).first()

        responses.append({
            "product_name": product.name,
            "quantity": items.quantity,
            "price":items.price,
            "image": product.image
        })

    return {
        "order_id":order_product.id,
        "status":order_product.status,
        "total_price":order_product.total_price,
        "products":responses,
        "created_at":order_product.created_at
    }

@app.put("/order/{order_id}/cancel")
def cancel_order(order_id: int, current_user:User=Depends(get_current_user), db:session=Depends(get_db)):

    order=db.query(Order).filter(
        Order.id==order_id,
        Order.user_id==current_user.id
    ).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status=="Cancelled":
        raise HTTPException(status_code=400, detail="Order already cancelled")
    
    order_items=db.query(Order_items).filter(
        Order_items.order_id==order.id
    ).all()

    for items in order_items:

        product=db.query(Product).filter(
            Product.id==items.product_id
        ).first()

        if product:
            product.stock += items.quantity

    order.status="Cancelled"

    db.commit()
    db.refresh(order)

    return JSONResponse(status_code=200, 
                        content={
        "message":"Order cancelled successfully",
        "order_id":order.id,
        "status":order.status
    })
    