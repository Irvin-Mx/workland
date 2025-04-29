import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Paquetes = () => {
    const { store, actions } = useContext(Context);

    return (

        <div className=" container my-5" style={{ alignItems: "center" }}>
            <div className="card mb-3 shadow-sm" style={{ maxWidth: "800px" }}>
                <div className="row no-gutters g-0 align-items-center">
                    <div className="col-auto p-3">
                        <img
                            src=""
                            alt=""
                            className="rounded-circle"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h2>Profesión</h2>
                            <h4 className="card-title mb-1">Nombre de la persona</h4>
                            
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
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pro-tab" data-bs-toggle="tab" data-bs-target="#pro" type="button" role="tab">
                            Pro
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="enterprise-tab" data-bs-toggle="tab" data-bs-target="#enterprise" type="button" role="tab">
                            Empresarial
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="pricingTabContent">
                    <div className="tab-pane fade show active" id="basic" role="tabpanel">
                        <div className="card p-4 shadow-sm">
                            <h5>Básico</h5>
                            <h6>$9/mes</h6>
                            <p>Descripción del producto</p>
                            <ul>
                                <li>✔ 1 boceto</li>
                                <li>✔ 5 cambios</li>
                                <li>✔ Archivo editable</li>
                            </ul>
                            <button type="button" className="btn ms-2" style={{ backgroundColor:"#00D1B2", color:"white", border:"none", borderRadius:"2px", alignItems: "center", width:"300px" }}>Comprar paquete</button>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pro" role="tabpanel">
                        <div className="card p-4 shadow-sm">
                            <h5>Pro</h5>
                            <h6>$29/mes</h6>
                            <p>Lo más popular</p>
                            <ul>
                                <li>✔ Hasta 5 usuarios</li>
                                <li>✔ Proyectos ilimitados</li>
                                <li>✔ Soporte prioritario</li>
                            </ul>
                            <button type="button" className="btn ms-2" style={{ backgroundColor:"#00D1B2", color:"white", border:"none", borderRadius:"2px", alignItems: "center", width:"300px" }}>Comprar paquete</button>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="enterprise" role="tabpanel">
                        <div className="card p-4 shadow-sm">
                            <h5>Empresarial</h5>
                            <h6>$99/mes</h6>
                            <p>Para grandes equipos</p>
                            <ul>
                                <li>✔ Usuarios ilimitados</li>
                                <li>✔ Funciones premium</li>
                                <li>✔ Soporte 24/7</li>
                            </ul>
                            <button type="button" className="btn ms-2" style={{ backgroundColor:"#00D1B2", color:"white", border:"none", borderRadius:"2px", alignItems: "center", width:"300px" }}>Comprar paquete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>






        // <div className="container">
        //     <div>
        //         <div className="d-flex flex-column">



        //             <div className="card-title border rounded shadow w-50 m-3 ms-1">
        //                 <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize:"1.5rem" }}>
        //                     ¿Qué Producto vas a vender?
        //                 </div>
        //                 <div className="card-body">
        //                     <div className="border p-4 rounded" style={{ background:"white",  justifyContent: "center" }}>
        //                         <i className="fa-solid fa-image fa-8x" style={{ opacity: 0.5 }}></i>
        //                         <div className="custom-file mb-4">
        //                             <input type="file" className="custom-file-input" id="inputGroupFile04" />

        //                         </div>

        //                         <div className="d-flex justify-content-between">
        //                             <button className="btn btn-danger" type="button">Eliminar</button>
        //                             <button className="btn btn-primary" type="button">Subir</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="card-description border rounded shadow w-50 m-3 ms-1">
        //                 <div className="card-header" style={{ background: "#1E266D", color: "#ffffff",fontSize:"1.5rem" }} >
        //                     Información del Producto
        //                 </div>
        //                 <div className="card-body">
        //                     <h5>Descripción básica de tu Producto</h5>
        //                     <div className="row">
        //                         <div className="col">
        //                             <label htmlFor="inputName" className="form-label">Nombre</label>
        //                             <input id="inputName" class="form-control" type="text" />
        //                         </div>
        //                         <div className="col">
        //                             <label htmlFor="inputName" className="form-label">Categoría</label>
        //                             <input id="inputName" class="form-control" type="text" />
        //                         </div>
        //                     </div>
        //                     <div className="text-area">
        //                         <label for="exampleFormControlTextarea1">Descripción del producto</label>
        //                         <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="card-package border rounded shadow w-50 m-3 ms-1" style={{background: "aliceblue"}}>
        //                 <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize:"1.5rem" }}>
        //                 Precios
        //                 </div>
        //                 <div className="card-body">
        //                     <h5>Tipo de paquete</h5>
        //                     <div className="row">
        //                         <div className="col mb-3">
        //                             <label for="disabledSelect" class="form-label">Disabled select menu</label>
        //                             <select id="disabledSelect" class="form-select">
        //                                 <option>Disabled select</option>
        //                             </select>
        //                         </div>
        //                         <div class="input-group col mb-3">
        //                             <span class="input-group-text">$</span>
        //                             <span class="input-group-text">0.00</span>
        //                             <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>




        //         </div>
        //     </div>
        // </div>
    );
};

export default Paquetes;

