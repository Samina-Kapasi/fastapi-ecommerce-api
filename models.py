from sqlalchemy import Float, String, Integer, Column, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

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
