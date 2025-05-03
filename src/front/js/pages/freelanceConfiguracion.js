import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";



export const FreelanceConfiguracion = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
    
        title: '',
        description: '',
        price: '',
        img_url: '',
    
    
});

    const [activeTab, setActiveTab] = useState("basic");

    const handleChange = (e) => {
        // const { title, description, price, img_url } = e.target;
        // const newValue = title, description,price,img_url ? [0] : value;
    
        e.persist() 
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });

    };

    const handleSubmit = async() => {
        try{
            await actions.createProduct(formData);
            alert("Producto creado correctamente ✅");
        }catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Ocurrió un error al crear el producto");
        }
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

            {/* <ul className="nav nav-tabs">
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
            </ul> */}

           
            <div className="my-3">
                <label>Título</label>
                <input
                    type="text"
                    name="title"
                    className="form-control mb-2"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Descripción</label>
                <textarea
                    name="description"
                    className="form-control mb-2"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>Precio</label>
                <input
                    type="text"
                    name="price"
                    className="form-control mb-3"
                    value={formData.price}
                    onChange={handleChange}
                />

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Guardar
                </button>
            </div>

            {/* <div className="mt-4">
                <h4>Vista previa:</h4>
                {["basic", "pro", "enterprise"].map(pkg => (
                    <div key={pkg} className="card p-3 mb-2">
                        <strong>{pkg.toUpperCase()}</strong>
                        <p><b>Título:</b> {formData[pkg].title}</p>
                        <p><b>Descripción:</b> {formData[pkg].description}</p>
                        <p><b>Precio:</b> ${formData[pkg].price}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );

}
 export default FreelanceConfiguracion;