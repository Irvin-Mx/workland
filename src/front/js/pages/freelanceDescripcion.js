import React, { useContext, useEffect, } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const FreelanceDescrption = () => {
    const { store, actions } = useContext(Context);


    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className=" d-flex flex-column align-items-center vh-100" >

            <div className="user-card d-flex my-3 p-3 w-50 border-rounded">
                <p>Bienvenido, proveedor
                    En nuestra plataforma, tú eliges <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces. Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</p>

            </div>
            <h2>Mi perfil</h2>

            <div className="user-card d-flex my-3 p-3 w-50 border rounded rounded shadow">
                <div className="rounded-circle" style={{ height: "150px", width: "150px", marginLeft: "10px", marginRight: "10px" }}>
                    <img
                        className="rounded-circle"
                        src={store.userProfile.img_url} alt="imagen perfil" style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }} />
                </div>

                <div className="col-md-6 d-flex flex-column align-items-start">

                    <h5 className="name">{user.name}</h5>
                    <h5 className="last_name">{user.last_name}</h5>
                    <p className="adress"><i className="fa-solid fa-location-dot me-3"></i>{user.address}</p>
                    <p className="phone"><i className="fa-solid fa-phone me-3"></i>{user.phone}</p>
                    <p className="email"><i className="fa-solid fa-envelope me-3"></i>{user.email}</p>
                </div>

                <div className="col-md-3 d-flex justify-content-end align-items-start">
                    <Link to="/freeForm">
                        <button
                            type="button"
                            className="btn btn-link"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </Link>


                    <button
                        type="button"
                        className="btn btn-link">
                        <i className="fa-solid fa-trash"></i>
                    </button>


                </div>
            </div>


            <div className="card w-50 border rounded rounded shadow ">
                <div className="card-header">
                    Perfil Profesional
                </div>
                <div className="card-body">
                    <p>Por favor describe tu profesión u oficio en un título</p>
                    <div className="form-floating m-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Profesión u oficio</label>
                    </div>
                    <p>Por favor describe tu perfil</p>
                    <div className="form-floating m-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Descripción</label>
                    </div>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="user-card d-flex flex-column p-1 w-50 align-items-center border-rounded">
                <h3>¡Súmate hoy y haz que cada servicio cuente!</h3>
            </div>
            <p>¡Estás a pocos pasos de conseguir el trabajo de tus sueños! Completa la siguiente información para comenzar a ofrecer tus servicios.</p>





        </div>
    );
};

export default FreelanceDescrption;

