from jose import jwt, JWTError 
from datetime import timedelta, datetime
import os 
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from database import SessionLocal
from models import User
from sqlalchemy.orm import session
from database import get_db


load_dotenv()
SECRET_KEY= os.getenv("SECRET_KEY")
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

Oauth2_scheme=OAuth2PasswordBearer(
    tokenUrl="login"
)

def create_access_token(data:dict):

    to_encode=data.copy()

    expire=datetime.utcnow()+timedelta(
        ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp":expire
    })

    encode_jwt= jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return encode_jwt

def get_current_user(token:str = Depends(Oauth2_scheme), db:session=Depends(get_db)):

    Credential_exception=HTTPException(status_code=400, detail="Invalid token")

    try :

        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id= payload.get("sub")

        if not user_id :
            raise Credential_exception
        
    except JWTError:
        raise Credential_exception
    
    user=db.query(User).filter(
        User.id==int(user_id)
    ).first()

    if not user:
        raise Credential_exception
    
    return user

