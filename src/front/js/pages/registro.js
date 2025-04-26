import React from "react";
import { Link, useParams } from 'react-router-dom';

export const Registro = () => {
    const { id } = useParams();

    return (
        <div className="d-flex justify-content-center">
            <h1 className="text-center">¡Bienvenido a workland !</h1>
            <div className="w-50 p-4 border rounded shadow">
             
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Nombre </label>
                        <input type="text" className="form-control" id="inputName" placeholder="Nombre" value="John Doe" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido </label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Apellido" value="John Doe" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input type="number" className="form-control" id="inputPhone" placeholder="Enter phone" value="1234567890" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Enter address" value="123 Main St" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" value="johndoe@example.com" readOnly />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" value="password123" readOnly />
                    </div>
                    <div className="mb-3">
                        <label for="disabledSelect" className="form-label">Selecciona el modo de perfil</label>
                        <select id="disabledSelect" className="form-select">
                            <option>Emprendedor</option>
                            <option>Freelance</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <Link to="/">
                        <button type="button" className="btn btn-secondary ms-2">Cancelar</button>
                    </Link>
                </form>

            </div>
        </div>
    );
};

export default Registro;