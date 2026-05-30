from fastapi import FastAPI, Depends, HTTPException
from database import Base, engine, SessionLocal
from models import Product
from schemas import ProductCreate
from sqlalchemy.orm import session
from fastapi.responses import JSONResponse

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

