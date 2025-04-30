import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/freelance.css";


export const FreelanceConfiguracion = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div>
                <div className="d-flex flex-column">


                    <div className="input-group w-50 m-5 ms-1" id="tituloProducto" >
                        <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Título del producto" style={{
                            border: "none",
                            borderBottom: "2px solid #1E266D",
                            outline: "none",
                            width: "100%",
                            padding: "8px 0",
                            fontSize: "30px",
                            color: "#1E266D",
                        }} />
                    </div>
                    <div className="card-title border rounded shadow w-50 m-3 ms-1">
                        <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize:"1.5rem" }}>
                            ¿Qué Producto vas a vender?
                        </div>
                        <div className="card-body">
                            <div className="border p-4 rounded" style={{ background:"white",  justifyContent: "center" }}>
                                <i className="fa-solid fa-image fa-8x" style={{ opacity: 0.5 }}></i>
                                <div className="custom-file mb-4">
                                    <input type="file" className="custom-file-input" id="inputGroupFile04" />

                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-danger" type="button">Eliminar</button>
                                    <button className="btn btn-primary" type="button">Subir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-description border rounded shadow w-50 m-3 ms-1">
                        <div className="card-header" style={{ background: "#1E266D", color: "#ffffff",fontSize:"1.5rem" }} >
                            Información del Producto
                        </div>
                        <div className="card-body">
                            <h5>Descripción básica de tu Producto</h5>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="inputName" className="form-label">Nombre</label>
                                    <input id="inputName" class="form-control" type="text" />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputName" className="form-label">Categoría</label>
                                    <input id="inputName" class="form-control" type="text" />
                                </div>
                            </div>
                            <div className="text-area">
                                <label for="exampleFormControlTextarea1">Descripción del producto</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="card-package border rounded shadow w-50 m-3 ms-1" style={{background: "aliceblue"}}>
                        <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize:"1.5rem" }}>
                        Precios
                        </div>
                        <div className="card-body">
                            <h5>Tipo de paquete</h5>
                            <div className="row">
                                <div className="col mb-3">
                                    <label for="disabledSelect" class="form-label">Disabled select menu</label>
                                    <select id="disabledSelect" class="form-select">
                                        <option>Disabled select</option>
                                    </select>
                                </div>
                                <div class="input-group col mb-3">
                                    <span class="input-group-text">$</span>
                                    <span class="input-group-text">0.00</span>
                                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default FreelanceConfiguracion;