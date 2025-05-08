import React, { useContext, useEffect, } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const FreelanceDashboard = () => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //     actions.getMyProfile();
    // }, []);

    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div>

                <NavbarLateral />
            </div>
            <div className=" flex-grow-1 p-4">

                <h1 className="text-start m-5">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h1>
                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">

                    <p>
                        En nuestra plataforma, tú eliges <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces. Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</p>

                </div>

                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">
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
                                className="btn btn-link">
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

            </div>
        </div>
    );
};

export default FreelanceDashboard;

