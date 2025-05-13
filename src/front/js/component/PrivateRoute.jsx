import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { toastFallo } from "./Toaster/toasterIndex.jsx";


const getUserStorage = ()=>{
    const userProfile = JSON.parse(localStorage.getItem('userProfile'))
    return userProfile.rol;
};

const PrivateRoute = ({ children, allowedRoles }) => {
    const { store } = useContext(Context);
    const userRole = store.userProfile.rol || getUserStorage();
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
      const timer = setTimeout(() => {
           
            setLoading(false);
        },1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingSpinner />;
   
    if (!userRole) return <Navigate to="/iniciar-sesion" />;
   if (!allowedRoles.includes(userRole)) {
        toastFallo("No tienes permiso para acceder a esta página.");
        return <Navigate to="/unauthorized"/>;
    }

    return children;
};

export default PrivateRoute;