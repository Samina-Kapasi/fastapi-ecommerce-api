from pydantic import BaseModel , Field, EmailStr
from typing import Optional

class ProductCreate(BaseModel):

    name:str

    description:str

    price:float

    stock:int

    category:str


class Update_ProductCreate(BaseModel):

    name : Optional[str]=None

    description : Optional[str]=None

    price : Optional[float]=None 

    stock : Optional[int]=None 

    category : Optional[str]=None

class CreateCart(BaseModel):

    product_id: int 

    quantity: int

class Update_Cart(BaseModel):

    quantity : Optional[int] = None


class CreateUser(BaseModel):

    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):

    email: EmailStr
    password : str

class Create_Order(BaseModel):
    pass