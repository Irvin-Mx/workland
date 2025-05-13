import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";
import rigoImageUrl from "../../img/rigo-baby.jpg";
const FreelanceDashboard = () => {
    const { store, actions } = useContext(Context);



    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            {/* <div>

                <NavbarLateral />
            </div> */}
            <div className=" flex-grow-1 p-4">

                <h3 className="m-2 display-4">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h3>
               

                <div>
                    <div class="card mb-3 w-80 border-0">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747168878/emprendedor-01_spuvcr.png"
                                    alt="Trendy Pants and Shoes"
                                    class="img-fluid rounded-start"
                                    style={{ width: '400px' }}
                                />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title display-5">¿Listo para comenzar?</h5>
                                    <p class="card-text lead">
                                       
                                        ¡Bienvenido a nuestra comunidad de emprendedores! Aquí, tienes la oportunidad de ofrecer tus servicios y conectar con personas que buscan lo que tú ofreces.
                                        Recuerda que en nuestra plataforma, tú decides <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces.
                                        <br /> Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 className="mt-4 display-6">¿Cómo empezar?</h4>
                    <p class=" lead">
                        Estás a pocos pasos de conseguir el trabajo de tus sueños. <br/>
                        Aquí tienes una guía rápida para que puedas empezar a ofrecer tus servicios y conectar con clientes potenciales.
                    </p>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="card border-0">
                                    <div className="card-body text-center">
                                        <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747170250/emprendedor-03_jb8vpi.png"
                                    alt="Trendy Pants and Shoes"
                                    class="img-fluid rounded-start"
                                    style={{ width: '250px' }}
                                />
                                        <h3 className="card-title">Completa tu perfil</h3>
                                        <p className="card-text ">Cuéntanos sobre ti, tus habilidades y tu experiencia.</p>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="col-12 col-md-6 col-lg-4 mb-3">
                                    <div className="card border-0">
                                        <div className="card-body text-center">
                                             <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747170687/emprendedor-02_lv2owo.png"
                                    alt="Trendy Pants and Shoes"
                                    class="img-fluid rounded-start"
                                    style={{ width: '250px' }}
                                />
                                            <h3 className="card-title">Sube tus productos</h3>
                                            <p className="card-text">Crea paquetes para ofrecer tus servicios : <strong>Básico</strong>,<strong>Medio</strong> Y <strong>Profesional</strong> facilita la elección del cliente y adapta tus soluciones a diferentes presupuestos.</p>
                                        </div>
                                    </div>
                                </div>
                            
                         
                                <div className="col-12 col-md-6 col-lg-4 mb-3">
                                    <div className="card border-0">
                                        <div className="card-body text-center">
                                           <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747170856/emprendedor-04_jsxdaa.png"
                                    alt="Trendy Pants and Shoes"
                                    class="img-fluid rounded-start"
                                    style={{ width: '250px' }}
                                />
                                            <h3 className="card-title">Conecta tu PayPal</h3>
                                            <p className="card-text">Crea una cuenta de PayPal Y recibe tus pagos de manera segura y directa, pagando una mínima comisión a la plataforma</p>
                                        </div>
                                    </div>
                                </div>
                           

                        </div>

                    </div>
                    <p className="lead">
                        Una vez completes estos pasos, estarás listo para comenzar a recibir propuestas y conectar con clientes.
                        En nuestra plataforma, respaldamos a emprendedores como tú. Por ello, solo aplicamos una comisión baja por cada trabajo vendido, sin tarifas ocultas ni costos mensuales, para que puedas enfocarte en hacer crecer tu negocio.
                    </p>
                </div>



            </div>
        </div >
    );
};

export default FreelanceDashboard;

