import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";



export const FreelanceConfiguracion = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        // category: '',
        // package: '',
        price: '',
        img_url:'',


    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    

    const handleSubmit = async () =>{
        try{
            await actions.createProduct(formData);
            alert("Producto creado correctamente.");
        } catch(error){
            console.error ("Error al crear procucto", error);
            alert ("Hubo un error al crear el producto");
        }

    };

    useEffect(() => {
        document.body.style.backgroundColor = "aliceblue";
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="container">

            <div className="d-flex flex-column">


                <div className="input-group w-50 m-5 ms-1" id="tituloProducto" >
                    <input type="text" name="title" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Título del producto" value={formData.title}
                        onChange={handleChange}  style={{
                            border: "none",
                            borderBottom: "2px solid #1E266D",
                            outline: "none",
                            width: "100%",
                            padding: "8px 0",
                            fontSize: "30px",
                            color: "#1E266D",
                            background: "aliceblue",
                        }} />
                </div>
                <div className="card-title border rounded shadow w-50 m-3 ms-1" style={{ background: "aliceblue" }}>
                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                        ¿Qué Producto vas a vender?
                    </div>
                    <div className="card-body">
                        <div className="border p-4 rounded" style={{ background: "white", justifyContent: "center" }}>
                            <i className="fa-solid fa-image fa-8x" style={{ opacity: 0.5 }}></i>
                            <div className="custom-file mb-4">
                                <input type="file" className="custom-file-input" id="inputGroupFile04" value={formData.files}
                                    onChange={handleChange} />

                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-danger" type="button">Eliminar</button>
                                <button className="btn btn-primary" type="button">Subir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-description border rounded shadow w-50 m-3 ms-1" style={{ background: "aliceblue" }}>
                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }} >
                        Información del Producto
                    </div>
                    <div className="card-body">
                        <h5>Descripción básica de tu Producto</h5>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="inputName" className="form-label">Nombre</label>
                                <input id="inputName" name="name" className="form-control" type="text"/>
                            </div>
                            <div className="col">
                                <label htmlFor="inputName" className="form-label">Categoría</label>
                                <input id="inputName" name="category" className="form-control" type="text" value={formData.category}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="text-area">
                            <label htmlFor="exampleFormControlTextarea1">Descripción del producto</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="description" value={formData.description}
                                onChange={handleChange} rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="card-package border rounded shadow w-50 m-3 ms-1" style={{ background: "aliceblue" }}>
                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                        Precios
                    </div>
                    <div className="card-body">
                        <h5>Tipo de paquete</h5>
                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="disabledSelect" className="form-label">Disabled select menu</label>
                                <select id="disabledSelect"  name="package" className="form-select" value={formData.package}
                                    onChange={handleChange}>
                                    <option value="">Selecciona un paquete</option>
                                    <option value="emprendedor">Basico</option>
                                    <option value="emprendedor">Pro</option>
                                    <option value="usuario">Empresarial</option>

                                </select>
                            </div>
                            <div className="input-group col mb-3">
                                <span className="input-group-text">$</span>
                                <span className="input-group-text">0.00</span>
                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" value={formData.amount}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button" className="btn btn-sm ms-2" id="siguiente"  onClick={handleSubmit} style={{
                    background: "#00D1B2", color: "aliceblue", fontSize: "1.5rem",
                    padding: "0.25rem 0.5rem ", width: "300px", height: "50px"
                }}>Guardar<i className="fa-solid fa-floppy-disk ms-2"></i></button>
            </div>
            <div className="card-title border rounded shadow w-50 m-3 ms-1" style={{ background: "aliceblue" }}>
                <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                    Vista previa
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
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FreelanceConfiguracion;