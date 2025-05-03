import React, { useContext, useEffect, } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const FreelanceEdit = () => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //     actions.getMyProfile();
    // }, []);

    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className=" d-flex flex-column align-items-center vh-100" >
            <h1 className="text-center m-5">¡Bienvenido a Workland!</h1>
            <div className="user-card d-flex my-3 p-3 w-50 border-rounded">
                <p>Bienvenido, proveedor
                    En nuestra plataforma, tú eliges <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces. Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</p>

            </div>

            <div className="user-card d-flex my-3 p-3 w-50 border rounded rounded shadow">
                <div className="col-md-3 d-flex justify-content-center">
                    <img src="" alt="user" className="rounded-circle" />
                </div>

                <div className="col-md-6 d-flex flex-column align-items-start">
                    <h5 className="name">{user.name}</h5>
                    <h5 className="last_name">{user.last_name}</h5>
                    <p className="adress"><i className="fa-solid fa-location-dot me-3"></i>{user.address}</p>
                    <p className="phone"><i className="fa-solid fa-phone me-3"></i>{user.phone}</p>
                    <p className="email"><i className="fa-solid fa-envelope me-3"></i>{user.email}</p>
                </div>

                <div className="col-md-3 d-flex justify-content-end align-items-start">
                    <button
                        type="button"
                        className="btn btn-link">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-link">
                        <i className="fa-solid fa-trash"></i>
                    </button>


                </div>
            </div>
            <div className="user-card d-flex flex-column p-1 w-50 align-items-center border-rounded">
                <h3>¡Súmate hoy y haz que cada servicio cuente!</h3>
            </div>
            <p>¡Estás a pocos pasos de conseguir el trabajo de tus sueños! Completa la siguiente información para comenzar a ofrecer tus servicios.</p>


            <div className="container mt-4">
                <div className="row g-4">


                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="badge me-2" style={{background: "#FF6B6B"}}>1</span>
                                    Agrega tus servicios
                                </h5>
                                <p className="card-text">Describe lo que ofreces para que los clientes puedan encontrarte fácilmente.</p>
                                <Link to="/freeConfig">
                                    <button type="button" className="btn ms-2" style={{ background: "#00D1B2", color: "aliceblue" }}>
                                        Agregar Servicio
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="badge me-2" style={{background: "#FF6B6B"}}>2</span>
                                    Crea una cuenta de PalPal
                                </h5>
                                <p className="card-text">Conecta una cuenta para recibir los pagos directamente de tus clientes.</p>
                                <a href="https://www.paypal.com/us/webapps/mpp/account-selection" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#00D1B2", color: "aliceblue" }}>Vincular cuenta</a>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default FreelanceEdit;

