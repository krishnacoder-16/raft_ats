from sqlalchemy.orm import Session
from app.models.user_model import User
from app.schemas.auth_schema import UserCreate
from app.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    pass

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        password_hash=hashed_password,
        role=user.role
    )
    return db_user
