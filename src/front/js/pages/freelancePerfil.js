import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import CommentSection from "../component/CommentSection.jsx";
import ReportButton from "../component/ReportButton.jsx";
import ReportModal from "../component/ReportModal.jsx";
import BotonRetroseso from "../component/BotonRetroseso.jsx";

export const FreelancePerfil = () => {
    const { store, actions } = useContext(Context);
    const { freelance_id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [noEsta, setNoEsta] = useState(false);
    const [servicesByCategory, setServicesByCategory] = useState({});
    const navigate = useNavigate();


    const defaultFavoriteStatus = false
    const [modalOpen, setModalOpen] = useState(false)
    const [report, setReport] = useState(false)

    let [isInFavorites, setIsInFavorites] = useState(false)


    useEffect(() => {

    }, []);

    const handleFavorite = () => {
        actions.toggleFavorite({ favorite_id: freelance_id })
            .then((res) => {
                setIsInFavorites(res.result);
            })
            .catch((err) => {
                console.error("Error al marcar favorito:", err);
            });
    };


    const categories = {
        basic: "Básico",
        pro: "Pro",
        enterprise: "Empresarial",
    };

    useEffect(() => {

        actions.getMyFreelanceProfile(freelance_id)
            .then((data) => {

                if (data?.result?.services) {
                    const grouped = {
                        basic: [],
                        pro: [],
                        enterprise: [],
                    };

                    data.result.services.forEach((service) => {
                        if (grouped[service.category]) {
                            grouped[service.category].push(service);
                        }
                    });
                    // console.log(data.result)

                    console.log(data.result)
                    setData(data.result);
                    setServicesByCategory(grouped);
                }
            })
            .catch((err) => {
                console.error("Error al cargar el perfil freelance:", err);


            })

        actions.checkReport({ freelance_id })
            .then((res) => {
                setReport(res.result);
            })
            .catch((err) => {
                console.log(err);
            });

        actions.checkFavorite({ favorite_id: freelance_id })
            .then((res) => {

                if (res?.error == "Usuario o favorito no encontrado") {
                    setLoading(false)
                    setNoEsta(true)
                    return
                }
                // setIsInFavorites(res.result);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return (
            <div style={{ fontSize: "40px", height: "100vh" }} className=" d-flex justify-content-lg-center align-items-center">
                <h2 className="text-center text-secondary" style={{ fontSize: "40px" }}>Cargando.</h2>
            </div>
        )
    }
    if (noEsta) {
        return (
            <div style={{ fontSize: "40px", height: "100vh" }} className=" d-flex justify-content-lg-center align-items-center">
                <h2 className="text-center text-secondary" style={{ fontSize: "40px" }}>No se encuentra el freelance.</h2>
            </div>
        )
    }

    return (
        <div  className="container my-1 w-100">
            <div className="row">
                {/* Perfil básico */}
                <div className="col-md-8 d-flex align-items-center justify-content-center flex-row w-100 gap-2">
                    <div className="card mb-3 shadow-sm position-relative w-75" style={{ maxWidth: "800px" }}>
                        <div className="bg-primary" >
                                     <img
                                    src={data?.cover_img_url}
                                    alt="Imagen de portada"
                                    className="img-fluid"
                                    style={{ height: "200px",width:"100%", objectFit: "cover" }}
                                />

                        </div>

                        <div style={{ position: "relative" }}>
                            {actions.checkLogInUser() === true ? (
                                store.userProfile.rol === "user" || store.userProfile.rol === "admin" ?

                                    <button onClick={() => handleFavorite(freelance_id)} className="btn position-absolute"
                                        style={{ top: "10px", right: "10px", zIndex: 1 }}>
                                        {isInFavorites ? (
                                            <>
                                                <i className="fa-solid fa-heart fa-xl" style={{ border: "2px", color: "#FF3860" }}></i>

                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-regular fa-heart fa-xl" ></i>

                                            </>
                                        )}
                                    </button>


                                    :
                                    null
                            )
                                :
                                null
                            }
                            <div className="row no-gutters g-0 align-items-center">
                                <div className="col-auto p-3">
                                    <img
                                        src={data?.img_url || rigoImageUrl}
                                        alt={`Imagen de ${data.name || "freelancer"}`}
                                        className="rounded-circle"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h2 className="card-title mb-1">{data?.service_title || "Profesión no especificada"}</h2>
                                        <h4 className="card-title mb-1">{data?.name}</h4>
                                        <p>{data?.profile_description || "Este usuario aún no ha completado su perfil profesional."}</p>
                                        {actions.checkLogInUser() === true ? (
                                            store.userProfile.rol === "user" || store.userProfile.rol === "admin" ?
                                                <ReportButton report={report} setModalOpen={setModalOpen} />
                                                :
                                                null
                                        )
                                            :
                                            null
                                        }

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                    {/* Sección de servicios */}
                    <div className="w-25 h-100 d-flex align-items-start flex-column">
                        <ul className="nav nav-tabs mb-3   " id="pricingTab" role="tablist">
                        {Object.entries(categories).map(([key, label], index) => (
                            <li className="nav-item" role="presentation" key={key}>
                                <button
                                    className={`nav-link ${index === 0 ? "active" : ""}`}
                                    id={`${key}-tab`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#${key}`}
                                    type="button"
                                    role="tab"
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="tab-content" id="pricingTabContent">
                        {Object.entries(categories).map(([key, label], index) => (
                            <div
                                key={key}
                                className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                id={key}
                                role="tabpanel"
                            >
                                {servicesByCategory[key]?.length > 0 ? (
                                    servicesByCategory[key].map((service) => (
                                        <div key={service.id} className="card p-4 shadow-sm mb-3">
                                            <h5>{service.title}</h5>
                                            <h6>${service.price}</h6>
                                            <p>{service.description}</p>
                                            <button
                                                onClick={() => navigate(`/user/detallado-de-orden?service=${service.id}`)}
                                                type="button"
                                                className="btn btn-sm btn-comprar-paquete"
                                                style={{ background: "#00D1B2", color: "aliceblue", width: "150px" }}
                                            >
                                                Comprar paquete
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No hay servicios en esta categoría.</p>
                                )}
                            </div>
                        ))}
                    </div>

                    </div>
              


                    {/* Comentarios */}
                </div>

                {/* Imagen de portada */}
                {/* <div className="col-md-4">
                    <div className="card mb-3 shadow-sm">

                        <div className="card-body text-center">
                            {data?.cover_img_url ? (
                                <img
                                    src={data?.cover_img_url}
                                    alt="Imagen de portada"
                                    className="img-fluid"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            ) : (
                                <p>No se ha cargado una imagen de portada</p>
                            )}
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="col-12 mt-4">
                <CommentSection freelance_id={freelance_id} />
            </div>

            {/* Modal de reporte */}
            <ReportModal modalOpen={modalOpen} setModalOpen={setModalOpen} freelance_id={freelance_id} />
            <BotonRetroseso />
        </div>
    );
};

export default FreelancePerfil;