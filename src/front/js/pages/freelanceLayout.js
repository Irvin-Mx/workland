import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";

export const FreelanceLayout = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        basic: { title: "", description: "", price: "", img_url: "" },
        pro: { title: "", description: "", price: "", img_url: "" },
        enterprise: { title: "", description: "", price: "", img_url: "" },
    });
    const [activeCategory, setActiveCategory] = useState("basic");
    const [imagePreview, setImagePreview] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "img_url" && files && files[0]) {
            setFormData((prev) => ({
                ...prev,
                [activeCategory]: { ...prev[activeCategory], img_url: files[0] },
            }));
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData((prev) => ({
                ...prev,
                [activeCategory]: { ...prev[activeCategory], [name]: value },
            }));
        }
    };

    const handleSubmit = async () => {
        const categoryData = formData[activeCategory];
        if (!categoryData.title || !categoryData.description || !categoryData.price) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        try {
            await actions.createProduct({ ...categoryData, category: activeCategory });
            alert(`Producto en categoría ${activeCategory} creado correctamente ✅`);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Ocurrió un error al crear el producto");
        }
    };

    const handleNextCategory = () => {
        const categories = ["basic", "pro", "enterprise"];
        const currentIndex = categories.indexOf(activeCategory);
        const nextIndex = (currentIndex + 1) % categories.length; // Cicla entre categorías
        setActiveCategory(categories[nextIndex]);
        setImagePreview(formData[categories[nextIndex]].img_url ? URL.createObjectURL(formData[categories[nextIndex]].img_url) : "");
    };

    return (
        <div className="container">
            <div className="row">
                
                <div className="col-md-8 mt-4">
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
                        <div className="card-title border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                ¿Qué Producto vas a vender?
                            </div>
                            <div className="card-body">
                                <div className="border p-4 rounded" style={{ background: "white", justifyContent: "center" }}>
                                    <i className="fa-solid fa-image fa-8x" style={{ opacity: 0.5 }}></i>
                                    <div className="custom-file mb-4">
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="img_url"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Vista previa"
                                                className="img-thumbnail mt-3"
                                                style={{ maxHeight: "200px" }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

           
                        <div className="card-description border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                Información del Producto
                            </div>
                            <div className="card-body">
                                <label htmlFor="description">Descripción del producto</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData[activeCategory].description}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                      
                        <div className="card-package border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                Precio
                            </div>
                            <div className="card-body">
                                <label htmlFor="price">Precio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData[activeCategory].price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn"
                                onClick={handleNextCategory}
                                style={{ width: "150px", background: "#1e266d", color:"aliceblue" }}
                            >
                                Siguiente
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={handleSubmit}
                                style={{ width: "150px",  background: "#00D1B2", color: "aliceblue" }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mt-4">
                    <h3>Vista previa de paquetes</h3>
                    <div className="row">
                        {["basic", "pro", "enterprise"].map((category) => (
                            <div className="card p-3 shadow-sm mb-3" key={category}>
                                <h5>{formData[category].title || "Título no definido"}</h5>
                                <h6>${formData[category].price || "0.00"}</h6>
                                <p>{formData[category].description || "Descripción no definida"}</p>
                                {formData[category].img_url && (
                                    <img
                                        src={
                                            typeof formData[category].img_url === "string"
                                                ? formData[category].img_url
                                                : URL.createObjectURL(formData[category].img_url)
                                        }
                                        alt={`Vista previa de ${category}`}
                                        className="img-thumbnail"
                                        style={{ maxHeight: "150px" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelanceLayout;