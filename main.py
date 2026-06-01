from fastapi import FastAPI, Depends, HTTPException
from database import Base, engine, SessionLocal
from models import Product
from schemas import ProductCreate, Update_ProductCreate
from sqlalchemy.orm import session
from fastapi.responses import JSONResponse
import json

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

    print(update_prod)
    
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

