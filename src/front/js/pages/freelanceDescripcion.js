import React, { useContext, useEffect, } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const FreelanceDescrption = () => {
    const { store, actions } = useContext(Context);


    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div>

                <NavbarLateral />
            </div>

            <div className=" flex-grow-1 p-4 align-items-center" >
                <div className="user-card d-flex flex-column p-1 w-50 align-items-center border-rounded">
                    <h3 className="m-3" >¡Estás a pocos pasos de conseguir el trabajo de tus sueños!</h3>
                </div>
                <h5>Completa la siguiente información para comenzar a ofrecer tus servicios.</h5>
                <h5 className="card-title text-left">
                    <span className="badge me-2" style={{ background: "#FF6B6B" }}>1</span>
                    Paso:  Completa tu perfil
                </h5>
                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">

                    <p>Usa un título breve y directo para indicar tu profesión u oficio, y luego cuéntanos más sobre tu experiencia, habilidades, logros o el tipo de servicios que ofreces. Recuerda que este perfil será tu carta de presentación, así que sé auténtico, profesional y enfócate en lo que te hace destacar.</p>

                </div>


                {/* <div className="user-card d-flex my-3 p-3 w-50 border rounded rounded shadow">
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

            </div> */}


                <div className="card w-50 border rounded rounded shadow mb-4 " style={{ background: "aliceblue" }} >

                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
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
                        <a href="#" className="btn" style={{ background: "#00D1B2", color: "aliceblue" }}>Guardar</a>
                    </div>
                </div>
                <Link to="/freeConfig">
                    <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#1e266d", color: "aliceblue" }} >Siguiente</button>
                </Link>







            </div>
        </div>
    );
};

export default FreelanceDescrption;

