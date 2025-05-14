import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CarruselFreelancers from "../component/CarruselFreelancers.jsx";



const Dashboard = () => {
    const { store, actions } = useContext(Context);



    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div className=" flex-grow-1 p-4">
                <h3 className="m-2 display-4">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h3>
                <div>
                    <div className="card mb-3 w-80 border-0">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747178938/user_uaszm2.png"
                                    alt="Trendy Pants and Shoes"
                                    className="img-fluid rounded-start"
                                    style={{ width: '300px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title display-5">¿Estás buscando al profesional ideal para tu proyecto?</h5>
                                    <p className="card-text lead">

                                        ¡Estás en el lugar correcto!
                                        En nuestra comunidad, puedes conectar con talentosos freelancers de diversas áreas que se adaptan a lo que necesitas. <strong>Conecta con los mejores profesionales que se ajustan a tus necesidades</strong> 
                                        y haz realidad tus ideas con el respaldo de una plataforma pensada para facilitar cada paso del proceso.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="card border-0">
                                    <div className="card-body text-center">
                                        <img
                                            src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747170250/emprendedor-03_jb8vpi.png"
                                            alt="Trendy Pants and Shoes"
                                            className="img-fluid rounded-start"
                                            style={{ width: '250px' }}
                                        />
                                        <h3 className="card-title">Realiza pagos seguros</h3>
                                        <p className="card-text ">Realiza tus pagos de manera rápida y sin preocupaciones. <strong></strong>¡Tu seguridad es lo primero!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="card border-0">
                                    <div className="card-body text-center">
                                        <img
                                            src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747170687/emprendedor-02_lv2owo.png"
                                            alt="Trendy Pants and Shoes"
                                            className="img-fluid rounded-start"
                                            style={{ width: '250px' }}
                                        />
                                        <h3 className="card-title">Califica el servicio</h3>
                                        <p className="card-text">Tu opinión cuenta. Ayuda a la comunidad calificando los servicios que recibes.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="bg-light py-5 text-center">
                        <div className="container">
                            <h2>¿Estás listo para empezar?</h2>
                            <p>Da el siguiente paso para construir el futuro que deseas. ¡Publica tus servicios o encuentra el talento que necesitas!</p>
                            <Link to="/user/busqueda" className="btn btn-primary btn-lg">Empieza ahora</Link>
                            <div className="row mt-4">
                                <CarruselFreelancers/>
                            </div>
                        
                        </div>

                    </div>

                </div>
            </div>
        </div>

     );
};

 export default Dashboard

