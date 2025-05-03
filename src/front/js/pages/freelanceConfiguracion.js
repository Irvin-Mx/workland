import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";



export const FreelanceConfiguracion = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        basic: {
            title: '',
            description: '',
            price: '',
            img_url: '',
        },
        pro: {
            title: '',
            description: '',
            price: '',
            img_url: '',
        },
        enterprise: {
            title: '',
            description: '',
            price: '',
            img_url: '',
        },
    });

    const [activeTab, setActiveTab] = useState("basic");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;
    
        setFormData({
            ...formData,
            [activeTab]: {
                ...formData[activeTab],
                [name]: newValue, 
            },
        });
    };



    const handleSubmit = () => {
        console.log("Datos guardados:", formData);
        alert("Producto guardado ✅");
    };


    useEffect(() => {
        document.body.style.backgroundColor = "aliceblue";
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="container my-4">
            <h2>Configuración del Producto</h2>

            <ul className="nav nav-tabs">
                {["basic", "pro", "enterprise"].map(tab => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>

           
            <div className="my-3">
                <label>Título</label>
                <input
                    type="text"
                    name="title"
                    className="form-control mb-2"
                    value={formData[activeTab].title}
                    onChange={handleChange}
                />

                <label>Descripción</label>
                <textarea
                    name="description"
                    className="form-control mb-2"
                    value={formData[activeTab].description}
                    onChange={handleChange}
                />

                <label>Precio</label>
                <input
                    type="text"
                    name="price"
                    className="form-control mb-3"
                    value={formData[activeTab].price}
                    onChange={handleChange}
                />

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Guardar
                </button>
            </div>

            <div className="mt-4">
                <h4>Vista previa:</h4>
                {["basic", "pro", "enterprise"].map(pkg => (
                    <div key={pkg} className="card p-3 mb-2">
                        <strong>{pkg.toUpperCase()}</strong>
                        <p><b>Título:</b> {formData[pkg].title}</p>
                        <p><b>Descripción:</b> {formData[pkg].description}</p>
                        <p><b>Precio:</b> ${formData[pkg].price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreelanceConfiguracion;