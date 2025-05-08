import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';



const FormularioFreelance = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser]= useState(
        store.userProfile
    )
   
    if (!user) return <p>Cargando datos del usuario...</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData ={
            name: user.name,
            last_name: user.last_name,
            phone: user.phone,
            address: user.address,
            email: user.email
        };
        actions.updateFreelanceProfile(updateData);
        navigate(-1);
    };

    return (
        <div className=" d-flex flex-column align-items-center vh-100 m-5">
            <div className="w-50 p-4 border rounded shadow" style={{ background: "aliceblue" }} >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido</label>
                        <input
                            id="inputLastName"
                            name="last_name"
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
                            value={user.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input
                            id="inputPhone"
                            name="phone"
                            type="number"
                            className="form-control"
                            placeholder="Ingresa tu teléfono"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Dirección</label>
                        <input
                            id="inputAddress"
                            name="address"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu dirección"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input
                            id="inputEmail"
                            name="email"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">
                            Tu correo está seguro con nosotros, no lo compartiremos con nadie.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhoto" className="form-label">Subir Imagen </label>
                        <input id="inputPhoto" name="photo" type="file" accept="image/*" className="form-control"  
                            // value={photo}
                            onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn" id="registro" style={{ background: "#00D1B2", color: "aliceblue" }}>
                        Guardar
                    </button>
                    
                        <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF3860", color: "aliceblue" }} onClick={() => navigate(-1)}>
                            Cancelar
                        </button>
                    
                </form>
            </div>
        </div>
    );
};

export default FormularioFreelance