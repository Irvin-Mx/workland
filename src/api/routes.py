"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Service,Order,Comment,Report
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import  JWTManager,create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from api.user_data_dummy import usuarios

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

def procesar_usuarios(usuarios):
            for usuario in usuarios:
                existing_user = User.query.filter_by(email=usuario["email"]).first()

                if not existing_user:
                    password_hasheada=bcrypt.generate_password_hash(usuario["password"]).decode("utf-8")
                    if usuario["rol"] == "freelance":
                        nuevo_usuario = User(
                            name=usuario["name"],
                            last_name=usuario["last_name"],
                            email=usuario["email"],
                            password=password_hasheada,
                            phone=usuario["phone"],
                            address=usuario["address"],
                            rol=usuario["rol"],
                            service_title=usuario["service_title"],
                            profile_description=usuario["profile_description"],
                            service_description=usuario["service_description"],
                            img_url=usuario["img_url"]
                        )
                        db.session.add(nuevo_usuario)
                        db.session.commit()

                        freelance_id = User.query.filter_by(email=usuario["email"]).first().serialize()["id"]

                        for servicio in usuario["services"]:
                            nuevo_servicio=Service(title=servicio["title"],price=servicio["price"],time=servicio["time"],description=servicio["description"],category=servicio["category"],user_id=freelance_id)
                            db.session.add(nuevo_servicio)
                            db.session.commit()


                    else: 
                        nuevo_usuario = User(
                            name=usuario["name"],
                            last_name=usuario["last_name"],
                            email=usuario["email"],
                            password=password_hasheada,
                            phone=usuario["phone"],
                            address=usuario["address"],
                            rol=usuario["rol"],
                            img_url=usuario["img_url"]
                        )
                        db.session.add(nuevo_usuario)
                        db.session.commit()

                    # db.session.add(nuevo_usuario)
                    print(f"Usuario creado: {usuario['email']}")
                else:
                    print(f"Email ya existe, saltando: {usuario['email']}")
                db.session.commit()
                print("Proceso completado")

# ==============AQUI INICIAN LAS RUTAS========

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
    

    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
@api.route('/service', methods=['POST'])
@jwt_required()
def post_service():
    try:
        user_id= get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg":"Freelance no encontrado"}), 404

        title = request.form.get("title")
        price = request.form.get("price")
        description = request.form.get("description")
        time = request.form.get("time")
        img_file = request.files.get("img_url")
        category = request.form.get("category")

        if not title or not price or not description or not time or not category:
            return jsonify({"error": "Todos los campos son obligatorios"}),400
        

        image_url = None
        if img_file:
            upload_result = cloudinary.uploader.upload(img_file)
            image_url = upload_result.get("secure_url")

        new_service=Service(
        user_id=int (user.id),
        title=title,
        description=description,
        price=int(price),
        time=time, 
        category=category,
        img_url=image_url,
        )

        db.session.add(new_service)
        db.session.commit()

        return jsonify({
        'msj': 'Servicio creado exitosamente',
        'result': new_service.serialize()}), 201


        
    except Exception as e:
        return jsonify({"error":f"Error interno del servidor: {str(e)}"
        }
    )
      
    
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
                "freelance_id":frelance_name["id"],
                "freelance_phone":frelance_name["phone"],
                "user_name":x["user_name"],
                "price":x["price"],
                "is_payed":x["is_payed"],
                "comment_id":x["comment_id"]
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
    
        user_dict = User.query.filter_by(id=freelance_id).first()

        if not user_dict:
            return jsonify({"msj": "Freelance no encontrado", "result": []}), 404
        services = [service.serialize() for service in user_dict.services]
        freelance_with ={
            "name": user_dict.name,
            "service_title": user_dict.service_title,
            "service_description": user_dict.service_description,
            "profile_description": user_dict.profile_description,
            "services": services
        }
        return jsonify({
            "result": freelance_with
            }), 200
        
    except Exception as e:
        return jsonify({
            "error":str(e)
        }),
# ruta para actualizr los datos solo de freelance

@api.route('/freelance', methods=['PUT'])
@jwt_required()
def update_freelance(): 
    try:
        form_data = request.form
        print(form_data.get("name"))
        photo_profile= request.files.get('photo_profile')
        photo_cover = request.files.get('photo_cover')

        user_id = get_jwt_identity()
        current_user = User.query.filter_by(id=user_id).first()

        if not current_user:
            return jsonify({"msj":  "Perfil de Freelance no encontrado", "result": []}), 404

       

        if photo_profile:
            current_user.img_url = photo_uploader(photo_profile)
        if photo_cover:
            current_user.cover_img_url = photo_uploader(photo_cover)
           
        current_user.name =form_data.get("name", current_user.name)
        current_user.last_name =form_data.get("last_name", current_user.last_name)
        current_user.email =form_data.get("email", current_user.email)
        current_user.phone =form_data.get("phone", current_user.phone)
        current_user.address =form_data.get("address", current_user.address)
        current_user.service_title =form_data.get("service_title", current_user.service_title)
        current_user.service_description =form_data.get("service_description", current_user.service_description)
        current_user.profile_description =form_data.get("profile_description", current_user.profile_description)


        db.session.commit()

        return jsonify({
            "msj": "Freelance actualizado correctamente",
            "result": current_user.serialize()
        }), 200

    except Exception as e:
        print(f"Error al actualizar freelance: {e}")
        return jsonify({
            "error": f"Error interno del servidor: {str(e)}"  
        }), 500


# ruta para actualizar solo los datos del user

    

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
    print(user_id)
    if user_id <= 0:
        return jsonify({"error": "El ID del usuario debe ser un número positivo"}), 400

    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"error": f"Usuario con ID {user_id} no encontrado"}), 404

    def nombre(objeto):
        data = objeto.serialize()
        name = data["name"]
        last_name = data["last_name"]
        id = data["id"]
        return {"name": name,"last_name": last_name,"id": id}      

    favorites = [nombre(fav) for fav in user.favoritos_agregados]

    
    print(favorites)
   
    return jsonify({
        "result": favorites
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
        
        fav_check=favorite_user in user.favoritos_agregados
 
        if fav_check == False:
            user.agregar_favorito(favorite_user)
            db.session.commit()
            return jsonify({
                "result": True,
                "message": "Favorito agregado correctamente"
            }),201
        else:

            user.eliminar_favorito(favorite_user)
            db.session.commit()
            return jsonify({
                "result": False,
                "message": "Favorito eliminado correctamente"
            }),200
            
    
    except Exception as e:
        db.session.rollback()

        return jsonify({"error": str(e)}), 500



@api.route("/comment/delete",methods=["DELETE"])
@jwt_required()
def delete_comment():
    try:
        data = request.get_json()
        user_id=int(get_jwt_identity())

        # freelance_id=int(data.get("freelance_id"))
        comment_id=int(data.get("comment_id"))

        user=User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"msj": "No se encuentra el usuario"}), 400
        
        # freelance=User.query.filter_by(id=freelance_id).first()
        # if not freelance:
        #     return jsonify({"msj": "No se encuentra el freelance"}), 400
        
        comment=Comment.query.filter_by(id=comment_id).first()
        # comment_length=len(user.comments_made)

        # if comment_length == 0:
        #     return jsonify({"msj": "No hay commentarios que borrar"}), 400
        
        if not comment:
            return jsonify({"msj": "No se encuentra el comentario"}), 400

        db.session.delete(comment)
        db.session.commit()

        return jsonify({
        "msj":"Comentario eliminado correctamente",
        "result":comment.serialize()
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500

@api.route("/comment/add",methods=["POST"])
@jwt_required()
def add_comment():
    try:
        data = request.get_json()
        user_id=int(get_jwt_identity())
        text=data.get("text")
        stars=data.get("stars")
        freelance_id=int(data.get("freelance_id"))
        order_id=data.get("order_id")
        print(order_id)

        user=User.query.filter_by(id=user_id).first()

        if not user:
            return jsonify({"msj": "No se encuentra el usuario"}), 400

        freelance=User.query.filter_by(id=freelance_id).first()

        if not freelance:
            return jsonify({"msj": "No se encuentra el freelance"}), 400
        
        order=Order.query.filter_by(id=order_id).first()

        if not order:
            return jsonify({"msj": "No se encuentra  la orden"}), 400
        
        

        comment = Comment(
            text=text,
            stars=stars,
            user_id=user_id,
            freelance_id=freelance_id,
        )

        db.session.add(comment)
        db.session.flush()  # Esto genera el ID del comentario sin hacer commit

        order.comment_id = comment.id
        db.session.commit()

        return jsonify({
        "msj":"Comentario creado correctamente",
        "result":comment.serialize()
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500
 
@api.route("/comment/user",methods=["GET"])
@jwt_required()
def get_comment_user():
    try:
        user_id=int(get_jwt_identity())
        user=User.query.filter_by(id=user_id).first()
        comments_len=len(user.comments_made)

        if comments_len ==0:
            return jsonify({"msj": "No se han hecho comentarios","result":[]}), 200

        if not user:
            return jsonify({"msj": "No se encuentra el usuario","result":[]}), 400
        
        def extrat_data(com):
            data=com.serialize()
            author=User.query.filter_by(id=data["user_id"]).first().serialize()
            autor_full_name=author["name"]+" "+ author["last_name"]
            autor_img_url=author["img_url"]
            result= {
                "id":data["id"],
                "text":data["text"],
                "stars":data["stars"],
                "author_full_name":autor_full_name,
                "author_img_url":autor_img_url
            }
            return result

        comentarios_hechos =[extrat_data(com) for com in user.comments_made] 
        
        return jsonify({
        "msj":"Comentarios",
        "result":comentarios_hechos
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

@api.route("/comment/freelance/<int:freelance_id>",methods=["GET"])
def get_comment_freelance(freelance_id):
    try:
        # user_id=int(get_jwt_identity())
        user=User.query.filter_by(id=freelance_id).first()

        if not user:
            return jsonify({"msj": "No se encuentra el usuario"}), 400
        
        def extrat_data(com):
            data=com.serialize()
            author=User.query.filter_by(id=data["user_id"]).first().serialize()
            autor_full_name=author["name"]+" "+ author["last_name"]
            autor_img_url=author["img_url"]
            result= {
                "id":data["id"],
                "text":data["text"],
                "stars":data["stars"],
                "author_full_name":autor_full_name,
                "author_img_url":autor_img_url
            }
            return result

        comentarios_recibidos =[extrat_data(com) for com in user.comments_received] 
        
        return jsonify({
        "result":comentarios_recibidos
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route("/report/add",methods=["POST"])
@jwt_required()
def add_report():
    try:
        data = request.get_json()
        user_id=int(get_jwt_identity())
        text=data.get("text")
        reason=data.get("reason")
        freelance_id=int(data.get("freelance_id"))

        new_report=Report(author_user_id=user_id,recipient_user_id=freelance_id,text=text,reason=reason)

        db.session.add(new_report)
        db.session.commit()

        return jsonify({
        "msj":"Reporte creado correctamente",
        "result":new_report.serialize()
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500
    
@api.route("/report/check",methods=["POST"])
@jwt_required()
def check_report():
    try:
        data = request.get_json()
        user_id=int(get_jwt_identity())

        freelance_id=int(data.get("freelance_id"))

        reporte_check = Report.query.filter(Report.author_user_id == user_id,Report.recipient_user_id == freelance_id).first()
        
        if  not reporte_check:
            return jsonify({"result":False }), 200

        return jsonify({
        "result":True
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500
    
@api.route("/report/delete",methods=["DELETE"])
@jwt_required()
def delete_report():
    try:
        data = request.get_json()
        # print(data)
        report_id=int(data.get("report_id"))
        admin_id=int(get_jwt_identity())
   

        admin_user=User.query.filter_by(id=admin_id).first().serialize()
    

        if  not admin_user:
            return jsonify({ "msj":"No hay cuenta" }), 400
        
        if  admin_user["rol"] != "admin":
            return jsonify({ "msj":"No es cuenta admin" }), 400

        report = Report.query.filter_by(id=report_id).first()
        print(report)
        
        if  not report:
            return jsonify({ "msj":"No hay reporte" }), 400
        
        db.session.delete(report)
        db.session.commit()

        return jsonify({
        "msj":"Reporte eliminado",
        "result":report.serialize()
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500
    

    
@api.route("/report/all",methods=["GET"])
@jwt_required()
def all_report():
    try:
        admin_id=int(get_jwt_identity())

        admin_user=User.query.filter_by(id=admin_id).first().serialize()

        if  not admin_user:
            return jsonify({ "msj":"No hay cuenta","result":[] }), 400
        
        if  admin_user["rol"] != "admin":
            return jsonify({ "msj":"No es cuenta admin" ,"result":[]}), 400

        all_report_raw = Report.query.all()
       
        if  not all_report_raw:
            return jsonify({ "msj":"No hay reportes","result":[] }), 200
        
        def config(obj):
            data=obj.serialize()
            id=data["id"]
            text=data["text"]
            reason=data["reason"]
            a=data["author_user_id"]
            r=data["recipient_user_id"]

            author_data=User.query.filter_by(id=a).first().serialize()
            author_id=author_data["id"]
            author_name=author_data["name"]
            author_last_name=author_data["last_name"]

            rec_data=User.query.filter_by(id=r).first().serialize()
            rec_id=rec_data["id"]
            rec_name=rec_data["name"]
            rec_last_name=rec_data["last_name"]

            result={
                "id":id,
                "text":text,
                "reason":reason,
                "author_info":{
                    "id":author_id,
                    "full_name":f"{author_name} {author_last_name}"
                },
                "recipient_info":{
                    "id":rec_id,
                    "full_name":f"{rec_name} {rec_last_name}"
                }}


            return result
            
        
        all_report = [config(rep) for rep in all_report_raw]
        print(all_report)
        
        return jsonify({
        # "msj":"Reporte eliminado",
        "result":all_report
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500
    

@api.route("/create-user",methods=["GET"])
def cretae_users():

    try:

        procesar_usuarios(usuarios)

        return jsonify({
        # "msj":"Reporte eliminado",
        "result":"Creado exitosamente"
        }),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msj": str(e)}), 500