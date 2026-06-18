from sqlalchemy import Float, String, Integer, Column, ForeignKey, DateTime
from database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

class Product(Base):

    __tablename__= "products"

    id= Column(
        Integer,
        primary_key=True,
        index=True
    )

    name=Column(String(250))

    description=Column(String(500))

    price=Column(Float)

    stock=Column(Integer)

    category=Column(String(250))

    cart_items=relationship(
        "Cart",
        back_populates="product"
    )

    order_item=relationship(
        "Order_items",
        back_populates="product"
    )


class Cart(Base):

    __tablename__="cart"

    id=Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )

    product_id=Column(
        Integer,
        ForeignKey("products.id")
    )

    quantity=Column(Integer)

    product=relationship(
        "Product",
        back_populates="cart_items"
    )

    user=relationship(
        "User",
        back_populates="cart_items"
    )

class User(Base):

    __tablename__= "users"

    id= Column(
        Integer,
        primary_key=True,
        index=True
    )

    name=Column(
        String(200),
        unique=True
    )

    email=Column(
        String(200),
        unique=True
    )

    password=Column(
        String(255)
    )

    cart_items=relationship(
        "Cart",
        back_populates="user"
    )

    orders=relationship(
        "Order",
        back_populates="user"
    )

class Order(Base):

    __tablename__="orders"

    id= Column(Integer,
               primary_key=True, 
               index=True)
    
    user_id=Column(Integer,
                   ForeignKey("users.id"))
    
    total_price=Column(
        Float
    )

    status=Column(String(200),
                  default="Pending")
    
    created_at=Column(
        DateTime,
        default=datetime.utcnow
    )

    user=relationship(
        "User",
        back_populates="order"
    )

    order_detail=relationship(
        "Order_items",
        back_populates="order"
    )

class Order_items(Base):

    __tablename__="order_items"

    id=Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id=Column(
        Integer,
        ForeignKey("orders.id")
    )

    product_id=Column(
        Integer,
        ForeignKey("products.id")
    )

    user_name=Column(
        String(200),
        ForeignKey("users.name")
    )

    quantity=Column(Integer)

    price=Column(Float)

    order=relationship(
        "Order",
        back_populates="order_detail"
    )

    order_item=relationship(
        "Product",
        back_populates="order_detail"
    )