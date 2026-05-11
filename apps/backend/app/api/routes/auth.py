from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth_schema import Token, UserCreate, UserResponse, UserLogin
from app.core.security import create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(form_data: UserLogin):
    if form_data.email != "admin@raft.com" or form_data.password != "password":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": form_data.email, "role": "admin"}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    return {
        "id": "1",
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "is_active": True,
        "created_at": "2023-10-01T00:00:00Z"
    }
