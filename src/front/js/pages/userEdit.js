import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";
import { Outlet } from "react-router-dom";

const userEdit = () => {
    const { store, actions } = useContext(Context);

  

    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div>
                <NavbarLateral user={"user"}/>
            </div>
            {/* Botón de colapso para dispositivos pequeños */}
            <button
                className="btn btn-primary d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accordionSidebar"
                aria-expanded="false"
                aria-controls="accordionSidebar"
            >
                <i className="fas fa-bars"></i>
            </button>
            
            <div className="container-fluid ">
                <Outlet />
            </div>
        </div>
    );
};

export default userEdit;

