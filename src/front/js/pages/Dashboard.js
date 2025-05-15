import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";




const Dashboard = () => {
    const { store, actions } = useContext(Context);



    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">

            <div className=" flex-grow-1">
                <h3 className="p-4 display-4">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h3>

                <div className="jumbotron p-4">
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-start">
                            <h1 className="display-6">¿Estás buscando al profesional ideal para tu proyecto?</h1>
                            <p className="lead">  ¡Estás en el lugar correcto!
                                En nuestra comunidad, puedes conectar con talentosos freelancers de diversas áreas que se adaptan a lo que necesitas. <strong>Conecta con los mejores profesionales que se ajustan a tus necesidades</strong>
                                y haz realidad tus ideas con el respaldo de una plataforma pensada para facilitar cada paso del proceso.</p>
                        </div>

                        <div className="col-lg-4 d-flex justify-content-center">
                            <img
                                src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747178938/user_uaszm2.png"
                                alt="imagen_de_busqueda"
                                className="img-fluid rounded-start"
                                style={{ width: '350px' }}
                            />
                        </div>
                    </div>


                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                            <div className="card border-0">
                                <div className="card-body text-center">
                                    <img
                                        src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747238580/user-10_ivdmkq.png"
                                        alt="pago_seguro_paypal"
                                        className="img-fluid rounded-start"
                                        style={{ width: '250px' }}
                                    />
                                    <h3 className="card-title">Realiza pagos seguros</h3>
                                    <p className="card-text fs-5">Realiza tus pagos de manera rápida y sin preocupaciones.<br /> <strong>¡Tu seguridad es lo primero!</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                            <div className="card border-0">
                                <div className="card-body text-center">
                                    <img
                                        src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747237916/user_-09_gjfnoa.png"
                                        alt="califica_servicio"
                                        className="img-fluid rounded-start"
                                        style={{ width: '250px' }}
                                    />
                                    <h3 className="card-title">Califica el servicio</h3>
                                    <p className="card-text fs-5">Tu opinión cuenta. Ayuda a la comunidad calificando los servicios que recibes.</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="container-fluid my-0 p-0">
                    <div className="jumbotron w-100" style={{ background: "aliceblue", margin: 0, padding: "2rem" }}>
                        <div className="row aling-items-center">
                            <div className="col-md-4 d-flex justify-content-center">
                                <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747238568/user-11_pp5ndn.png"
                                    alt="busqueda"
                                    className="img-fluid rounded-start"
                                    style={{ width: '250px' }}
                                />
                            </div>
                            <div className="col-md-8 text-start">
                                <h1 className="display-5">¿Estás listo para empezar?</h1>
                                <p className="lead"> Da el siguiente paso para construir el futuro que deseas.</p>
                                <p className="fs-5"><strong>¡Encuentra el talento que necesitas!</strong></p>
                                <p className="lead">
                                    <Link to="/user/busqueda" className="btn btn-lg" style={{ background: "#00D1B2", color: "aliceblue" }}>Empieza ahora</Link>
                                </p>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>



    );
};

export default Dashboard

