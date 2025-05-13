import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const Dashboard = () => {
    const { store, actions } = useContext(Context);



    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">

            <div className=" flex-grow-1 p-4">
                <div className="banner-container" style={{ position: 'relative', backgroundColor: '#1E266D', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                    <div className="container">
                        <h1 className="display-4">Buen día {user.name} {user.last_name}</h1>
                        <p className="lead mb-4">
                            Conecta con los mejores profesionales que se ajustan a tus necesidades.
                        </p>
                    </div>
                </div>


                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-light rounded">
                        <div className="card-body text-center">
                            <i className="bi bi-credit-card-fill" style={{ fontSize: '3rem', color: '#00D1B2' }}></i>
                            <h5 className="mt-3">Realiza pagos seguros</h5>
                            <p>Realiza tus pagos de manera rápida y sin preocupaciones. ¡Tu seguridad es lo primero!</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-light rounded">
                        <div className="card-body text-center">
                            <i className="bi bi-star-fill" style={{ fontSize: '3rem', color: '#FFC107' }}></i>
                            <h5 className="mt-3">Califica el servicio</h5>
                            <p>Tu opinión cuenta. Ayuda a la comunidad calificando los servicios que recibes.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-light py-5 text-center">
                <div className="container">
                    <h2>¿Estás listo para empezar?</h2>
                    <p>Da el siguiente paso para construir el futuro que deseas. ¡Publica tus servicios o encuentra el talento que necesitas!</p>
                    <Link to="/freelance" className="btn btn-primary btn-lg">Empieza ahora</Link>
                </div>
            </div>
            </div>

            

        </div>






    );
};

export default Dashboard;

