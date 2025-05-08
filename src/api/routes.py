"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Service,Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import  JWTManager,create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"), # Click 'View API Keys' above to copy your API secret
    secure=True
)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

jwt = JWTManager() 
bcrypt = Bcrypt()  

IMAGE_PROFILE_URL="https://res.cloudinary.com/dph121s7p/image/upload/v1746471079/image_profile_placceholder_dfzbln.jpg"

def photo_uploader(photo,height=300,width=300):
    upload_result = upload(photo)
    cloud_url, options = cloudinary_url(upload_result['public_id'], format="jpg", crop="fill", width=height,height=height)

    return cloud_url

@api.route('/test/sign-up', methods=['POST'])
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
                "msj": f"Faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400
        
        existe_usuario = User.query.filter_by(email=email).first()

        if not existe_usuario:
            return jsonify({"msj":"Correo no esta registardo","result":[]}),400
        
        hasheada_password=existe_usuario.password
        its_valid_password=bcrypt.check_password_hash(hasheada_password,password)

        if its_valid_password:
            services = [service.serialize() for service in existe_usuario.services]
            resultado={**existe_usuario.serialize(), "services": services}
            expires=timedelta(days=1)
            token=create_access_token(identity=str(existe_usuario.id),expires_delta=expires)
            return jsonify({ 'token':token,"user_info":resultado,"msj":"Inicio de sesion exitosa"}), 200
        else :
            return jsonify({"msj":"Contraseña equivocada"}),404

    except Exception as e:
        return jsonify({
            "error":str(e)
        })
    

@api.route("/search",methods=["POST"])
def search_results():
    try:
        busqueda=request.get_json()
        
        if not busqueda:
            return jsonify({
            'msj': "El termino de busqueda no debe de estar vacio.",
            "result":[]
        }),400

        resultados = User.query.filter(
            User.service_description.ilike(f'%{busqueda}%')
        ).all()

        data = [{
            'id': resultado.id,
            'title': resultado.service_description,
            "user_name":f'{resultado.name} {resultado.last_name}'
            # Agrega otros campos que necesites mostrar
        } for resultado in resultados]

        return jsonify({
            'msj': True,
            "result":data
            
        }),200
    

    except Exception as e:
        return jsonify({
            "error":str(e)
        })


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    try:
        user_id=get_jwt_identity()
        if user_id:
            user=User.query.filter_by(id=user_id).first()
            services = [service.serialize() for service in user.services]
            resultado={**user.serialize(), "services": services}
            return jsonify(resultado), 200
    
        else:
            return {"Error": "Token inválido o no proporcionado"}, 401

        
    except Exception as e:
        return jsonify({
            "error":str(e)
        })
    
@api.route('/profile/freelance/', methods=['POST'])
@jwt_required()
def create_freelance_profile():
    try:
        data = request.get_json()

        required_fields = ["service_title", "service_description", "profile_description"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                "msj": f"faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400
        
        user_id = get_jwt_identity()
        user = User.query.filter(User.id == int(user_id)).first()


        if not User:
            return jsonify({"msj":"No existe usuario"}), 400
        
        if user.service_title or user.service_description or user.profile_description:
            return jsonify({"msj": "El perfil ya existe"}), 400
        
        user.service_title = data["service_title"]
        user.service_description = data["service_description"]
        user.profile_description = data["profile_description"]
        db.session.commit()

        return jsonify({
        'msj': 'Perfil creado exitosamente',
        'result': user.serialize()}), 200

    except Exception as e:
        return jsonify({
            "error":str(e)
        })
        
@api.route('/service', methods=['POST'])
@jwt_required()
def post_service():
    try:
        data = request.get_json()

        title = data.get("title")
        price = data.get("price")
        description = data.get("description")
        time= data.get("time")
        img_url = data.get("img_url")
        category = data.get("category")
        user_id=get_jwt_identity()
        print(type(user_id))

        required_fields = ["title", "price", "time" "description", "category"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                "msj": f"faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400

        existe_usuario = User.query.filter(User.id == int(user_id)).first()


        if not existe_usuario:
            return jsonify({"msj":"No existe usuario"}), 400
        
        nuevo_servicio=Service(title=title,price=int(price),time=time, description=description,img_url=img_url,category=category,user_id=int(user_id))
        print(nuevo_servicio.serialize())
        db.session.add(nuevo_servicio)
        db.session.commit()

        return jsonify({
        'msj': 'Servicio creado exitosamente',
        'result': nuevo_servicio.serialize()}), 201


        
    except Exception as e:
        return jsonify({
            "error":str(e)
        })
    



@api.route('/service/<int:service_id>', methods=['GET'])
def get_single_service(service_id):
    try:
        servicio = Service.query.filter(Service.id == int(service_id)).first()

        if not servicio:
            return jsonify({"msj":"No existe servicio"}), 400


        usuario = User.query.filter(User.id == int(servicio.user_id)).first()

        if not usuario:
            return jsonify({"msj":"No existe usuario"}), 400
        
        result={
            "description":servicio.serialize()["description"] ,
            "id": servicio.serialize()["id"] ,
            "img_url":servicio.serialize()["img_url"] ,
            "price":servicio.serialize()["price"],
            "time":servicio.serialize()["time"],
            "title": servicio.serialize()["title"],
            "user": {
                "id":usuario.serialize()["id"],
                "name":usuario.serialize()["name"]
            }
        }
        

        return jsonify({
        'result': result}), 200

    
    except Exception as e:
        return jsonify({
            "error":str(e)
        })


@api.route('/create-order', methods=['POST'])
@jwt_required()
def create_order():
    try:
        print('Attempting to create new order...')
        data = request.get_json()
        
        user_id = get_jwt_identity()

        user_dict = User.query.filter_by(id=user_id).first()
        #print(user_dict.serialize()["name"])
        user_name= user_dict.serialize()["name"]


        status = data.get("status")
        is_payed = data.get("is_payed")
        service_id = data.get("service_id")
        
        #user_id = data.get("user_id")
        price = data.get("price")

        
        required_fields = ["status", "is_payed","price","user_id","service_id"]
        #required_fields = ["status", "is_payed","service_id","user_id"]
        # missing_fields = [field for field in required_fields if not data.get(field)]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({
                "msj": f"faltan campos necesarios: {', '.join(missing_fields)}",
                "result": []
            }), 400
        
        #Buscar si existe user_id en db
        usuario = User.query.filter_by(id=user_id).first()

        #service_user_name = data.get()

        if not usuario:
            return jsonify({"msj":"Usuario no encontrado","result":[]}),400
        
        #Buscar si existe service_id en db
        servicio = Service.query.filter_by(id=service_id).first()
  

        if not servicio:
            return jsonify({"msj":"Servicio no encontrado","result":[]}),400
        
        #nueva_orden=Order(status=status,is_payed=is_payed,price=price,service_id=service_id,user_id=user_id)
        nueva_orden=Order(status=status,is_payed=is_payed,price=float(price),service_id=int(service_id),user_id=int(user_id),user_name=user_name)
        
        db.session.add(nueva_orden)
        db.session.commit()

        return jsonify({"msg":"Craeda exitosamente","result": nueva_orden.serialize()}), 201
    
    except Exception as e:
        return jsonify({
            "error":str(e)
        })
    


@api.route('/order', methods=['GET'])
@jwt_required()
def get_order():
    try:
        orders = Order.query.filter_by(user_id=get_jwt_identity()).all()
        
        data = [order.serialize() for order in orders]
    
        def info(x):
            service_id=x["service_id"]
            freelance_user_id=Service.query.filter_by(id=service_id).first().serialize()["user_id"]
            frelance_name=User.query.filter_by(id=freelance_user_id).first().serialize()
            

            return {
                "id":x["id"],
                "freelance_name":frelance_name["name"],
                "freelance_email":frelance_name["email"],
                "freelance_phone":frelance_name["phone"],
                "user_name":x["user_name"],
                "price":x["price"],
                "is_payed":x["is_payed"],
            }
        
        raw= list(map(info, data))

        return jsonify({"result": raw} ),200

    except Exception as e:
        return jsonify({
            "error":str(e)
        }),

@api.route('/freelance/<int:freelance_id>', methods=['GET'])
def get_freelance(freelance_id):
    try:
        print(freelance_id)
        user_dict = User.query.filter_by(id=freelance_id).first()
        if not user_dict:
            return jsonify({"msj": "Freelance no encontrado", "result": []}), 404
        services = [service.serialize() for service in user_dict.services]
        freelance_with ={
            "name": user_dict.serialize()["name"],
            "services": services
        }
        return jsonify({
            "result": freelance_with
            }), 200
        
    except Exception as e:
        return jsonify({
            "error":str(e)
        }),

@api.route('/freelance', methods=['PUT'])
@jwt_required()
def update_freelance(): 
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg": "Faltan datos en la solicitud"}), 400

        user_id = get_jwt_identity()
        current_user = User.query.filter_by(id=user_id).first()

        if not current_user:
            return jsonify({"msj": "Usuario no encontrado", "result": []}), 404


        user_to_update = User.query.filter_by(id=user_id).first()

        if not user_to_update:
            return jsonify({"msj": "Freelance no encontrado", "result": []}), 404

        user_to_update.name = data.get("name", user_to_update.name)
        user_to_update.last_name = data.get("last_name", user_to_update.last_name)
        user_to_update.email = data.get("email", user_to_update.email)
        user_to_update.phone = data.get("phone", user_to_update.phone)
        user_to_update.address = data.get("address", user_to_update.address)

        db.session.commit()

        return jsonify({
            "msj": "Freelance actualizado correctamente",
            "result": user_to_update.serialize()
        }), 200

    except Exception as e:
        print(f"Error al actualizar freelance: {e}")
        return jsonify({
            "error": f"Error interno del servidor: {str(e)}"  
        }), 500

    

@api.route('/sign-up', methods=['POST'])
def sign_up_img():
    try:
        data=request.form
  
        name = request.form.get('name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        rol = request.form.get('rol')
        address = request.form.get('address')
        phone = request.form.get('phone')

        photo = request.files.get('photo')

        required_fields = ["name", "last_name", "email", "password", "phone", "rol","address"]
        missing_fields = [field for field in required_fields if not data.get(field)]
            
        if missing_fields:
            return jsonify({
                "msj": f"Faltan campos necesarios: {', '.join(missing_fields)}",
                    "result": []
                }), 400

        if  not photo :
            photo=IMAGE_PROFILE_URL
        else:

            photo=photo_uploader(photo)
        
        existe_usuario = User.query.filter(User.email == email).first()

        if existe_usuario:
            return jsonify({"msj":"Correo ya registrado","result":[]}),400
        
        password_hasheada=bcrypt.generate_password_hash(password).decode("utf-8")
        nuevo_usuario=User(name=name,last_name=last_name,email=email,password=password_hasheada,phone=phone ,rol=rol,address=address,img_url=photo)
        
        db.session.add(nuevo_usuario)
        db.session.commit()
     
        return jsonify({
                "msj":"Usuario creado correctamente",
                "result":nuevo_usuario.serialize()
                }), 200
    
    except Exception as e:
        return jsonify({
            "msj":"Problemas al crear el usuario",
            "error":str(e)
        })

#/favorite/check
@api.route("/favorite/check", methods=['POST'])
@jwt_required()
def check_favorite():
    try:
        # Obtener el ID del usuario 
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Validar que se haya proporcionado un favorite_id
        favorite_id = data.get('favorite_id')

        # Obtener los usuarios involucrados
        user = User.query.get(current_user_id)
        favorite_user = User.query.get(favorite_id)

        # Verificar si los usuarios existen
        if not user or not favorite_user:
            return jsonify({"error": "Usuario o favorito no encontrado"}), 404

        # Verificar si el usuario está en la lista de favoritos
        is_favorite = user.tiene_favorito(favorite_user)

        return jsonify({
            "result": is_favorite,
            "message": "El usuario está en la lista de favoritos" if is_favorite else "El usuario no está en la lista de favoritos"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/favorites/all', methods=['GET'])
@jwt_required()
def get_user_favorites():
    user_id = int(get_jwt_identity())

    if user_id <= 0:
        return jsonify({"error": "El ID del usuario debe ser un número positivo"}), 400

    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"error": f"Usuario con ID {user_id} no encontrado"}), 404

    favorites = user.favoritos_agregados
    return jsonify({
        "result": [fav.serialize() for fav in favorites]
    }), 200


@api.route('/favorite/change', methods=['POST'])
@jwt_required()
def create_favorite():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        favorite_status = data.get('favorite_status')

        favorite_id = data.get('favorite_id')

        user = User.query.get(current_user_id)
        favorite_user = User.query.get(favorite_id)

        if not user or not favorite_user:
            return jsonify({"error": "Usuario o favorito no encontrado"}), 404

        if favorite_status == False:
            # Verificar si el favorito ya existe
            if favorite_user in user.favoritos_agregados:
                return jsonify({"message": "El usuario ya está en la lista de favoritos"}), 200

            # Agregar el favorito
            user.agregar_favorito(favorite_user)
            db.session.commit()
            return jsonify({
                "result": True,
                "message": "Favorito agregado correctamente"
                # "favoritos": [fav.id for fav in user.favoritos_agregados]
            }),201
        else:
            # Eliminar el favorito
            user.eliminar_favorito(favorite_user)
            db.session.commit()
            return jsonify({
                "result": False,
                "message": "Favorito eliminado correctamente"
            }),200
            
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
