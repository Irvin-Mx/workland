import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const FreelanceLayout = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        basic: { title: "", description: "", price: "", time: "" },
        pro: { title: "", description: "", price: "", time: "" },
        enterprise: { title: "", description: "", time: "", price: "" },
    });



    const [activeCategory, setActiveCategory] = useState("basic");
    const [savedPackages, setSavedPackages] = useState([]);
    const [packageIds, setPackagesIds] = useState({});

    const categories = ["basic", "pro", "enterprise"];

    useEffect(() => {
        const saved = localStorage.getItem("savePackages");
        const data = localStorage.getItem("formData");
        const ids = localStorage.getItem("packageIds");


        if (saved) setSavedPackages(JSON.parse(saved));
        if (data) setFormData(JSON.parse(data));
        if (ids) setPackagesIds(JSON.parse(ids));


    }, []);

    useEffect(() => {
        localStorage.setItem("savePackages", JSON.stringify(savedPackages));
    }, [savedPackages]);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);


    useEffect(() => {
        localStorage.setItem("packagesIds", JSON.stringify(packageIds));
    }, [packageIds]);

    const clearStorage = () => {
        localStorage.removeItem("savePackages");
        localStorage.removeItem("formData");
        localStorage.removeItem("packageIds");
        setSavedPackages([]);
        setPackagesIds({});

    };



    const handleNextCategory = () => {
        const currentIndex = categories.indexOf(activeCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        setActiveCategory(categories[nextIndex]);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [activeCategory]: {
                ...formData[activeCategory],
                [name]: value
            }
        });
    };

    const handleSubmitAll = async () => {
        for (let cat of categories) {
            const data = formData[cat];
            if (!data.title || !data.description || !data.price || !data.time) {
                toast.error(`Completa todos los datos del paquete ${cat}`);
                return;
            }

            const fd = new FormData();
            fd.append("title", data.title);
            fd.append("description", data.description);
            fd.append("price", parseInt(data.price));
            fd.append("time", data.time);
            fd.append("category", cat);



            try {
                if (packageIds[cat]) {
                    await actions.updateProduct(packageIds[cat], fd);
                    toast.success(`Paquete ${cat} actualizado`);
                } else {
                    const result = await actions.createProduct(fd);
                    if (result && result.id) {
                        setSavedPackages((prev) => [...new Set([...prev, cat])]);
                        setPackagesIds((prev) => ({ ...prev, [cat]: result.id }));
                        toast.success(`Paquete ${cat} guardado`);
                    }
                }
            } catch (err) {
                console.error(`Error al guardar el paquete ${cat}:`, err);
                toast.error(`Error al guardar el paquete ${cat}`);
                return;
            }
        }
        toast.success("Todos los paquetes han sido guardados exitosamente");
        clearStorage();


    };

    const allSaved = categories.every(cat => savedPackages.includes(cat));

    return (
        <div className="w-100 ps-3">

            <h5 className="card-title pt-3 ">
                <span className="badge me-2 " style={{ background: "#FF6B6B" }}>2</span>
                Agrega tus servicios
            </h5>
            <p>Crea paquetes para ofrecer tus servicios : <strong>Básico,</strong> <strong>Profesional</strong> y <strong>Empresarial</strong> facilita la elección del cliente y adapta tus soluciones a diferentes presupuestos.</p>
             <div className="d-flex justify-content-around mb-4">
                {categories.map((cat, i) => (
                    <div
                        key={cat}
                        className={`text-center ${cat === activeCategory ? "fw-bold text-primary" : "text-muted"}`}
                    >
                        <div className={`rounded-circle mx-auto mb-1 ${cat === activeCategory ? "bg-primary" : "bg-secondary"}`}
                            style={{ width: 30, height: 30, lineHeight: "30px", color: "white" }}>
                            {i + 1}
                        </div>
                        <div className="text-capitalize">{cat}</div>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-md-7 mt-4">
                    <h2>Formulario para {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
                    <div className="d-flex flex-column">

                        <div className="input-group w-100 mb-4">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Título del producto"
                                value={formData[activeCategory].title}
                                onChange={handleChange}
                                disabled={savedPackages.includes(activeCategory)}
                                style={{
                                    border: "none",
                                    borderBottom: "2px solid #1E266D",
                                    outline: "none",
                                    width: "100%",
                                    padding: "8px 0",
                                    fontSize: "20px",
                                    color: "#1E266D",
                                    background: "aliceblue",
                                }}
                            />
                        </div>

                        {/* Subir imagen */}



                        <div className="card border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                Información del Producto
                            </div>
                            <div className="card-body">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData[activeCategory].description}
                                    onChange={handleChange}
                                    disabled={savedPackages.includes(activeCategory)}
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="row justify-content-around ">
                            <div className="col-6 d-flex align-items-strech">
                                <div className=" card border rounded shadow mb-4 w-100" style={{ background: "aliceblue" }}>
                                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                        Precio
                                    </div>
                                    <div className="card-body">
                                        <label htmlFor="price">Precio</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={formData[activeCategory].price}
                                            onChange={handleChange}
                                            disabled={savedPackages.includes(activeCategory)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-flex aling-items-strech">
                                <div className="card border rounded shadow mb-4 w-100" style={{ background: "aliceblue" }}>
                                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                        Tiempo estimado
                                    </div>
                                    <div className="card-body">
                                        <label htmlFor="price">Tiempo estimado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="time"
                                            name="time"
                                            value={formData[activeCategory].time}
                                            onChange={handleChange}
                                            disabled={savedPackages.includes(activeCategory)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn"
                                onClick={handleSubmitAll}
                                style={{ width: "150px", background: "#00D1B2", color: "aliceblue" }}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={handleNextCategory}
                                style={{ width: "150px", background: "#1e266d", color: "aliceblue" }}
                            >
                                <i className="bi bi-chevron-double-right me-1"></i>
                                Siguiente
                            </button>
                            
                           
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mt-4 me-1">
                    <h3>Vista previa de paquetes</h3>
                    <div className="row">
                        {categories.map((category) => (
                            <div className={`card p-3 shadow-sm mb-3 border-${savedPackages.includes(category) ? "success" : "secondary"}`} key={category}>
                                <h5>{formData[category].title || "Título no definido"}</h5>
                                <h6>${formData[category].price || "0.00"}</h6>
                                <p>{formData[category].time || "Escribe un tiempo aproximado"}</p>
                                <p>{formData[category].description || "Descripción no definida"}</p>
                                {savedPackages.includes(category) && (
                                    <span className="badge bg-success"> <i className="bi bi-check2-circle me-1"></i>Guardado</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FreelanceLayout;