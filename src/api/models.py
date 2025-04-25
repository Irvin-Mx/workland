from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    rol = db.Column(db.String(20), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,

            "telefono": self.telefono,
            "rol": self.rol,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }