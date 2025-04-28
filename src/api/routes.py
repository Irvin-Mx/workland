"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import  JWTManager,create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

jwt = JWTManager() 
bcrypt = Bcrypt()  

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def sign_up():

    try:
        data = request.get_json()

        name = data.get("name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        phone = data.get("phone")
        rol = data.get("rol")
        address = data.get("address")
   

        required_fields = ["name", "last_name", "email", "password", "phone", "rol","address"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                "msj": f"faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400
        
        existe_usuario = User.query.filter(User.email == data["email"]).first()

        if existe_usuario:
            return jsonify({"msj":"Correo ya registardo","result":[]}),400
        
        password_hasheada=bcrypt.generate_password_hash(data["password"]).decode("utf-8")

        
        nuevo_usuario=User(name=name,last_name=last_name,email=email,password=password_hasheada,phone=phone ,rol=rol,address=address)
        
        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({"msg":"Craedo exitosamente","result":{
            "name":name,
            "last_name":last_name,
            "email":email,
            "phone":phone ,
            "rol":rol,
            "address":address
        }}), 201
        
    except Exception as e:
        return jsonify({
            "error":str(e)
        })
    
@api.route('/log-in', methods=['POST'])
def log_in():

    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

    


        required_fields = ["email", "password"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                "msj": f"faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400
        
        existe_usuario = User.query.filter_by(email=email).first()
  

        if not existe_usuario:
            return jsonify({"msj":"Correo no esta registardo","result":[]}),400
        
        hasheada_password=existe_usuario.password
        its_valid_password=bcrypt.check_password_hash(hasheada_password,password)

        if its_valid_password:
            expires=timedelta(days=1)
            token=create_access_token(identity=str(existe_usuario.id),expires_delta=expires)
            return jsonify({ 'token':token}), 200
        else :
            return jsonify({"msj":"Password equivocado"}),404

        
    except Exception as e:
        return jsonify({
            "error":str(e)
        })
