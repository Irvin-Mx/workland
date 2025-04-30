import React, { useContext,useEffect, } from "react";
import { Context } from "../store/appContext";

export const FreelanceEdit = () => {
const {store,actions}= useContext(Context);

useEffect(() => {
    actions.getMyProfile();
}, []);

const user = store.userProfile || {};
if (!user.name) return <p>Cargando datos del usuario...</p>;

return (
    <div  className="user-card d-flex my-3 p-3 border rounded">
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
                <i className="fa-solid fa-trash"></i>
            </button>

        
        </div>
    </div>
);
};

export default FreelanceEdit;