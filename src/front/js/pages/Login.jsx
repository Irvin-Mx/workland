import React, { useContext, useState } from "react"
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
            email: '',
            password: ''
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.signup(formData);
        setFormData({
            email: '',
            password: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { actions } = useContext(Context);
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h5 className="text-center mb-4">Ingresa los siguientes datos para iniciar sesion</h5>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input id="inputEmail" name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" value={formData.email}
                            onChange={handleChange} />
                        <div id="emailHelp" className="form-text">Tu correo está seguro con nosotros, no lo compartiremos con nadie.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input id="inputPassword" name="password" type="password" className="form-control" placeholder="Password" value={formData.password}
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