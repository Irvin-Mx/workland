import React, { useEffect, useContext, useState,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext"
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const FreelancePerfil = () => {
    const { store, actions } = useContext(Context);
    const { freelance_id } = useParams();
    const [data,setData]=useState({})
    const navigate = useNavigate();

    useEffect(() => {
        actions.getMyFreelanceProfile(freelance_id).then((data) => {
    
            setData(data.result)
        }).catch((err)=>console.log(err))
    }, []);

    // const user = store.freelancerProfile;
    // console.log(“Freelancer Profile:“, user);
    // if (!user || Object.keys(user).length === 0) {
    //     return <p>Cargando datos del usuario...</p>;
    // }
  

    return (
        <div className="container my-5" style={{ alignItems: "center" }}>
            <div className="card mb-3 shadow-sm" style={{ maxWidth: "800px" }}>
                <div className="row no-gutters g-0 align-items-center">
                    <div className="col-auto p-3">
                        <img
                            src={rigoImageUrl}
                            alt=""
                            className="rounded-circle"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h2>Profesión</h2>
                            <h4 className="card-title mb-1">{`${data.name}`}</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor rhoncus quam. Sed massa ligula, vehicula eget faucibus in, rhoncus eget justo. Cras hendrerit suscipit magna, nec aliquet turpis pharetra eget. Suspendisse eget mi laoreet diam hendrerit posuere in at mi. Nunc semper massa nec nulla molestie congue. </p>
                            <div className="d-flex justify-content-end gap-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <ul className="nav nav-tabs mb-3" id="pricingTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="basic-tab" data-bs-toggle="tab" data-bs-target="#basic" type="button" role="tab">
                            Básico
                        </button>
                    </li>
                    {/* <li className=“nav-item” role=“presentation”>
                        <button className=“nav-link” id=“pro-tab” data-bs-toggle=“tab” data-bs-target=“#pro” type=“button” role=“tab”>
                            Pro
                        </button>
                    </li>
                    <li className=“nav-item” role=“presentation”>
                        <button className=“nav-link” id=“enterprise-tab” data-bs-toggle=“tab” data-bs-target=“#enterprise” type=“button” role=“tab”>
                            Empresarial
                        </button>
                    </li> */}
                </ul>
                <div className="tab-content" id="pricingTabContent">
                    {data.services?.length > 0 ? (
                        data.services?.map((service, index) => (
                            <div key={index} className="card p-4 shadow-sm mb-3">
                                <h5>{service.title}</h5>
                                <h6>${service.price}</h6>
                                <p>{service.description}</p>
                                <button onClick={()=>{navigate(`/detallado-de-orden?service=${service.id}`)}}
                                    type="button"
                                    className="btn ms-2"
                                    style={{
                                        backgroundColor: "#00D1B2",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "2px",
                                        width: "300px",
                                    }}
                                >
                                    Comprar paquete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay servicios disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreelancePerfil;

