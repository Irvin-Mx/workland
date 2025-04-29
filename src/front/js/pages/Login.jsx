import React, { useContext, useState,useEffect } from "react"
import { Context } from "../store/appContext.js";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {

    const { store, actions } = useContext(Context)

    const navigate = useNavigate()
    
    useEffect(() => {

        if (actions.checkLogInUser()) {
            // Si el token existe, redirigir al usuario a home donde ya puede ver su perfil de home 
            navigate("/")
        }
    })

    const [formData, setFormData] = useState({
            email: '',
            password: ''
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.login(formData);
        setFormData({
            email: '',
            password: ''
        });
        // console.log("Aqui esta el token...vista login")
        // console.log(localStorage)
        localStorage.setItem("userToken", store.userToken);
        if (store.userToken) {
            //console.log(store.token)
            navigate("/")
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const { actions } = useContext(Context);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" >
            <div className="w-50 p-4">
                <form className="" onSubmit={handleSubmit}>
                    <h5 className="text-center mb-4">Ingresa los siguientes datos para iniciar sesion</h5>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input id="inputEmail" name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Correo electrónico" value={formData.email}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input id="inputPassword" name="password" type="password" className="form-control" placeholder="Contraseña" value={formData.password}
                            onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn" id="registro">Iniciar sesion</button>
                    <Link to="/">
                        <button type="button" className="btn ms-2" id="cancelar" >Cancelar</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login