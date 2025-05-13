import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

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

                <h1 className="text-start m-5">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h1>
                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">

                    <h5>
                        En nuestra plataforma, tú eliges <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces. Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</h5>
                    <hr className="my-4" />
                </div>
                <div><h4 className="mb-3 text-primary">📌 ¿Cómo funciona?</h4>
                    <p>
                        Solo aplicamos una comisión por cada trabajo vendido. ¡Sin costos ocultos!
                    </p>
                    <h5 className="mt-4 text-success">🛠️ Para comenzar, sigue estos 3 pasos:</h5>
                    <ol className="list-group list-group-numbered my-3">
                        <li className="list-group-item">
                            <strong>Completa tu perfil profesional:</strong> Cuéntanos sobre ti, tus habilidades y tu experiencia.
                        </li>
                        <li className="list-group-item">
                            <strong>Sube tus primeros 3 productos:</strong> Crea tus paquetes de servicio:
                            <ul className="mt-2">
                                <li><strong>Básico:</strong> Una opción simple y accesible.</li>
                                <li><strong>Medio:</strong> Un servicio más completo.</li>
                                <li><strong>Profesional:</strong> Un paquete premium con todo incluido.</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <strong>Conecta tu cuenta PayPal:</strong> Así podrás recibir tus pagos de manera segura y directa.
                        </li>
                    </ol>

                    <p className="mt-4 text-muted">
                        Una vez completes estos pasos, estarás listo para comenzar a recibir propuestas y conectar con clientes.
                    </p>
                </div>



            </div>
        </div>
    );
};

export default FreelanceDashboard;

