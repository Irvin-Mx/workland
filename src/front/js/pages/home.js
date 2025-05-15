import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ComentariosHome from "../component/ComentariosHome.jsx";
import "../../styles/home.css";

// import "../../../../public/homeSlider1.jpg"

import styles from "./home.module.css"


export const Home = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	const [terminoBusqueda, setTerminoBusqueda] = useState(store.terminoBusqueda)
	const [searchClick, setSerchClick] = useState(false)
	const handleChange = (e) => {
		setTerminoBusqueda(e.target.value)
	}

	const handleKeyDown = (e) => {
		// Only roles of user or admin will navigate here
		if (e.key === "Enter" && store?.userProfile?.rol == "user" || e.key === "Enter" && store?.userProfile?.rol == "admin") {
			actions.changeSearchTerm(terminoBusqueda)
			setTerminoBusqueda("")
			navigate(`${store?.userProfile?.rol}/busqueda`)
		}
		// Only roles of user or admin will navigate here
		if (e.key === "Enter" && store?.userProfile?.rol == "freelance") {
			actions.changeSearchTerm(terminoBusqueda)
			setTerminoBusqueda("")
			navigate("free/busqueda")
		}

		if (e.key === "Enter" && typeof (store.userProfile.rol) == "undefined") {
			actions.changeSearchTerm(terminoBusqueda)
			setTerminoBusqueda("")
			navigate("/busqueda")
		}

	};


	return (
		<div className="text-center pb-4">
			<div>
				{/* Carousel */}
				
				<div id="carouselExampleAutoplaying" className={`carousel slide ${styles.slider__container}`} data-ride="carousel">


					<div className="carousel-inner h-100">
						<div className="carousel-item active h-100">
							<img className={`d-block w-100 h-100 ${styles.objectFit}`} src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747285420/homeSlider1_fqyytp.jpg" alt="First slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Second slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Third slide" />
						</div>
					</div>
					<div className="position-absolute start-0 top-0 h-100 w-100 d-flex flex-column justify-content-center" style={{ background: "rgba(30, 62, 109, 0.5)" }}>
						<h2 className="display-1 fw-bolder text-white mb-5">Workland</h2>
						<h4 className="text-white display-5 mt-4 fw-bold">
							<span style={{color:"white"}}>Trabaja.</span>
							<span style={{color:"white"}} >Contrata.</span>
							<span style={{color:"white"}}>Conecta.</span>
							</h4>
					</div>
					<div className="input-group mb-3 mt-2 w-50 position-absolute top-50 start-50 translate-middle">
						<input
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							value={terminoBusqueda}
							type="text"
							className="form-control"
							placeholder="Barra de búsqueda"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							style={{ borderRadius: "5px", height: "50px", backgroundColor: "#f8f9fa", fontSize: "20px"}}
						/>
						<button
							onClick={() => {
								actions.changeSearchTerm(terminoBusqueda);
								setTerminoBusqueda("");
								// navigate("/busqueda");
								store?.userProfile?.rol == "freelance" ? navigate("free/busqueda") : null
								store?.userProfile?.rol == "user" ? navigate(`${store?.userProfile?.rol}/busqueda`) : null
								store?.userProfile?.rol == "admin" ? navigate(`${store?.userProfile?.rol}/busqueda`) : null
								!store?.userProfile?.rol ? navigate(`/busqueda`) : null
							}}
							className="btn "
							type="button"
							id="button-addon2"
							style={{ backgroundColor: "#1e266d", color: "white"  }}
						>
							<i className="fa-solid fa-magnifying-glass fa-xl"></i>
						</button>
					</div>

					{/* <a className="carousel-control-prev" href="#carouselExampleAutoplaying" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleAutoplaying" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a> */}
				</div>

				{/* Main Content */}
				{/*Top section*/}
				<div className="row align-items-center my-5">
					<div className="col">
						<div>
							<img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747171959/indicadores-07_c8ynkt.png"
                                    alt="Trendy Pants and Shoes"
                                    className="img-fluid rounded-start"
                                    style={{ width: '150px' }}
                                />
							<h3 className="display-6"><strong>Conexión rápida</strong></h3>
						</div>
					</div>
					<div className="col">
						<div>
							<img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747171959/indicadores-06_dsquob.png"
                                    alt="Trendy Pants and Shoes"
                                    className="img-fluid rounded-start"
                                    style={{ width: '150px' }}
                                />
							<h3 className="display-6"><strong>Gestión integral</strong></h3>
						</div>
					</div>
					<div className="col">
						<div>
							<img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747171959/indicadores-05_sgjbiq.png"
                                    alt="Trendy Pants and Shoes"
                                    className="img-fluid rounded-start"
                                    style={{ width: '150px' }}
                                />
							<h3 className="display-6"><strong>Precios justos</strong></h3>
						</div>

					</div>
				</div>
				{/*App overview section*/}
				<div className="d-flex flex-column justify-content-center align-items-center">
					<div className="w-75">
						{/* Card */}
						<div className="card mb-4 ">
							<div className="row g-0 ">
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://res.cloudinary.com/dmuktnm3l/image/upload/v1747096924/homeContent1_p1sesm.jpg" className="img-fluid rounded-start object-fit-contain" alt="..." />
									{/* <i className="fa-regular fa-clipboard fs-1"></i> */}
								</div>
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">

										<i className="fa-regular fa-clipboard fa-7x mb-2"></i>
										<h5 className="card-title justify-content-start w-100 display-6 "> <strong>Publica tu trabajo</strong></h5>


										<p className="card-text lead">¡Es gratis y fácil! Obtén muchas ofertas competitivas que se ajusten a tu presupuesto en minutos. Comienza a hacer realidad tus sueños.</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Card */}
						<div className="card mb-4 border">
							<div className="row g-0 ">
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">

										<i className="fa-solid fa-users fa-7x mb-2"></i>
										<h5 className="card-title justify-content-start w-100 display-6"> <strong>Encuentra freelancers</strong></h5>


										<p className="card-text lead">Ningún trabajo es demasiado grande o complejo. Contamos con freelancers para trabajos de cualquier tamaño o presupuesto, en más de 2700 habilidades. Deja que nuestro talento haga realidad tus ideas.</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div> 
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://res.cloudinary.com/dmuktnm3l/image/upload/v1747097214/homeSlider2_lzxftc.jpg" className="img-fluid rounded-start object-fit-contain" alt="..." />
									{/* <i className="fa-solid fa-users fs-1"></i> */}
								</div>
							</div>
						</div>

						{/* Card */}
						<div className="card mb-4 ">
							<div className="row g-0 ">
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://res.cloudinary.com/dmuktnm3l/image/upload/v1747097214/homeSlider3_rkmdwb.jpg" className="img-fluid rounded-start object-fit-contain" alt="..." />
									{/* <i className="fa-regular fa-credit-card fs-1"></i> */}
								</div>
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">

										<i className="fa-regular fa-credit-card fa-7x mb-2"></i>


										<h5 className="card-title justify-content-start w-100 display-6"><strong>Pagos seguros</strong></h5>
										<p className="card-text lead">Solo paga por el trabajo cuando estés 100% satisfecho con el resultado. Nuestro sistema de pagos por hitos te protege en cada paso del camino..</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Reviews */}
						{/* <div className="card mb-3">
							<div className="row g-0">


								<div className="col-4 ">
									<div className="d-flex align-items-center w-100">
										<div className="card-body d-flex flex-column p-4">
											<h5 className="card-title justify-content-start fs-3">Carlos</h5>
											<p className="card-text">"Excelente servicio de desarrollo web. La comunicación fue fluida y el resultado superó mis expectativas. Sin duda, recomendaría a este freelancer a otros." </p>
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4">
										<div className=" d-flex justify-content-between w-50">
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`} ></i>
											</div>
										</div>
									</div>
								</div>

								<div className="col-4 ">
									<div className="d-flex align-items-center w-100">
										<div className="card-body d-flex flex-column p-4">
											<h5 className="card-title justify-content-start fs-3">Lucia</h5>
											<p className="card-text text-center">"Trabajo con Juan en varios proyectos y siempre ha cumplido con los plazos y la calidad. Recomiendo su servicio para cualquier tarea de diseño gráfico." </p>
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4 ">
										<div className=" d-flex justify-content-between w-50">
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`} ></i>
											</div>
										</div>
									</div>
								</div>

								<div className="col-4 ">
									<div className="d-flex align-items-center w-100">
										<div className="card-body d-flex flex-column p-4">
											<h5 className="card-title justify-content-start fs-3">Julio</h5>
											<p className="card-text">"Marta es una profesional increíble. Su habilidad para resolver problemas y su disposición para ayudar a los clientes son inigualables."</p>
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4 ">
										<div className="d-flex justify-content-between w-50">
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`}></i>
											</div>
											<div>
												<i className={`fa-solid fa-star  ${styles.staricons}`} ></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}

						<div>
							<h3 className="mb-3">Lee los testimonios que nuestros usuarios satisfechos. </h3>
							<ComentariosHome/>
						</div>


					</div>
				</div>
			</div>
		</div>
	);
};
