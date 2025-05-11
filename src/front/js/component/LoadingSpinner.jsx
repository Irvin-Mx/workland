import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando... </span>
            </div>
        </div>
    );
};
export default LoadingSpinner;
