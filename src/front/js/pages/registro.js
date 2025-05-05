import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Registro = () => {
    const navigate=useNavigate()
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        rol: ''
    });
    const [photo,setPhoto]=useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDatatoSubmit = new FormData();
        formDatatoSubmit.append('name', formData.name);
        formDatatoSubmit.append('last_name', formData.last_name);
        formDatatoSubmit.append('phone', formData.phone);
        formDatatoSubmit.append('address', formData.address);
        formDatatoSubmit.append('email', formData.email);
        formDatatoSubmit.append('password', formData.password);
        formDatatoSubmit.append('rol', formData.rol);
        formDatatoSubmit.append('photo', photo);


        await actions.signup(formDatatoSubmit)
        .then((res)=>{
        if(res.msj=="Usuario creado correctamente"){
            setFormData({
                name: '',
                last_name: '',
                phone: '',
                address: '',
                email: '',
                password: '',
                rol: ''
            })
            navigate("/iniciar-sesion")
        }
        })
        .catch((err)=>{
            console.log(err)

        })
        // await actions.signup(formData);

    };
    useEffect(() => {
        document.body.style.backgroundColor = '#CCD6F6';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);


 

    return (

        <div className=" d-flex flex-column align-items-center vh-100" >
            <h1 className="text-center m-5">¡Bienvenido a Workland!</h1>
            <div className="w-50 p-4 border rounded shadow" style={{ background: "aliceblue" }} >

                <form onSubmit={handleSubmit}>
                    <h5 className="text-center mb-4">Ingresa los siguientes datos para crear tu cuenta</h5>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre </label>
                        <input id="name" name="name" type="text" className="form-control" placeholder="Nombre" value={formData.name}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido </label>
                        <input id="inputLastName" name="last_name" type="text" className="form-control" placeholder="Apellido" value={formData.last_name}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhoto" className="form-label">Subir Imagen </label>
                        <input id="inputPhoto" name="photo" type="file" accept="image/*" className="form-control"  
                            // value={photo}
                            onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input id="inputPhone" name="phone" type="number" className="form-control" placeholder="Ingresa tu teléfono" value={formData.phone}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Dirección</label>
                        <input id="inputAddress" name="address" type="text" className="form-control" placeholder="Ingresa tu dirección" value={formData.address}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input id="inputEmail" name="email"type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" value={formData.email}
                            onChange={handleChange} />
                        <div id="emailHelp" className="form-text">Tu correo está seguro con nosotros, no lo compartiremos con nadie.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input id="inputPassword" name="password" type="password" className="form-control" placeholder="Password" value={formData.password}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="disabledSelect" className="form-label">Selecciona el modo de perfil</label>
                        <select id="disabledSelect" name="rol" className="form-select" value={formData.rol}
                            onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="emprendedor">Emprendedor</option>
                            <option value="usuario">Freelance</option>
                        </select>
                    </div>
                    <button type="submit" className="btn" id="registro" style={{ background: "#00D1B2", color: "aliceblue" }}>Registrar</button>
                    <Link to="/">
                        <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF3860", color: "aliceblue" }} >Cancelar</button>
                    </Link>
                </form>

            </div>
        </div>

    );
};

export default Registro;

