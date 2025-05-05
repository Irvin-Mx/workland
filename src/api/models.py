from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from decimal import Decimal

db = SQLAlchemy()

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(20), nullable=False)
    service_description = db.Column(db.String(300), nullable=True)
    balance=db.Column(db.Integer(), nullable=True ,default=0)
    img_url=db.Column(db.String(), nullable=True)

    is_active = db.Column(db.Boolean(), nullable=False,default=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)

    services = relationship("Service", back_populates="user")
    orders = relationship("Order",back_populates="user")


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "phone": self.phone,
            "address": self.address,
            "rol": self.rol,
            "is_active": self.is_active,
            "balance": self.balance,
            "services":  self.services,
            "img_url":  self.img_url,
            # do not serialize the password, its a security breach
        }

class Service(db.Model):
    __tablename__="services"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    price = db.Column(db.DECIMAL(precision=10, scale=2), nullable=True)
    description = db.Column(db.String(200), nullable=True)
    img_url=db.Column(db.String(), nullable=True)

    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="services")
    orders = relationship("Order",back_populates="services")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "price": self.price,
            "description": self.description,
            "img_url": self.img_url,
            "user_id": self.user_id,
            # do not serialize the password, its a security breach
        }

class Order(db.Model):
    __tablename__="orders"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    status = db.Column(db.String(20), nullable=False)
    is_payed = db.Column(db.Boolean(),default=False)
    price = db.Column(db.Float)
    user_name = db.Column(db.String(30), nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'))
    service_id = Column(Integer, ForeignKey('services.id'))

    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)

    services = relationship("Service", back_populates="orders")
    user = relationship("User", back_populates="orders")

    def serialize(self):
        return {
            "id": self.id,
            "status": self.status,
            "price": self.price,
            "is_payed": self.is_payed,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "user_name": self.user_name
            # do not serialize the password, its a security breach
        }