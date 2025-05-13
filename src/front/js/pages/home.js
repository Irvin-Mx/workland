import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toastFallo } from "../component/Toaster/toasterIndex.jsx";
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
		<div className="text-center">
			<div>
				{/* Carousel */}
				<div id="carouselExampleAutoplaying" className={`carousel slide ${styles.slider__container}`} data-ride="carousel">


					<div className="carousel-inner h-100">
						<div className="carousel-item active h-100">
							<img className={`d-block w-100 h-100 ${styles.objectFit}`} src="https://res.cloudinary.com/dmuktnm3l/image/upload/v1747061284/homeSlider1_bkngng.jpg" alt="First slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Second slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Third slide" />
						</div>
					</div>
					<div className="position-absolute start-0 top-0 h-100 w-100 d-flex flex-column justify-content-center">
						<h2 className="display-1 fw-bolder text-white mb-5">Workland</h2>
						<h4 className="text-white mt-4 fw-bold">Trabaja.Contrata.Conecta.</h4>
					</div>
					<div className="input-group mb-3 mt-2 w-50 position-absolute top-50 start-50 translate-middle">
						<input
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							value={terminoBusqueda}
							type="text"
							className="form-control"
							placeholder="Search"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
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
							className="btn btn-outline-secondary"
							type="button"
							id="button-addon2"
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>

					<a className="carousel-control-prev" href="#carouselExampleAutoplaying" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleAutoplaying" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>

				{/* Main Content */}
				{/*Top section*/}
				<div className="row align-items-center my-5">
					<div className="col">
						<div>
							<i className="fa-brands fa-searchengin fs-2 mb-3"></i>
							<h3>Conexión rápida</h3>
						</div>
					</div>
					<div className="col">
						<div>
							<i className="fa-solid fa-list-check fs-2 mb-3"></i>
							<h3>Gestión integral</h3>
						</div>
					</div>
					<div className="col">
						<div>
							<i className="fa-solid fa-dollar-sign fs-2 mb-3"></i>
							<h3>Precios justos</h3>
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
										<h5 className="card-title justify-content-start w-100  fs-3"><span><i className="fa-regular fa-clipboard fs-3"></i></span> Publica tu trabajo</h5>
										<p className="card-text">¡Es gratis y fácil! Obtén muchas ofertas competitivas que se ajusten a tu presupuesto en minutos. Comienza a hacer realidad tus sueños.</p>
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
										<h5 className="card-title justify-content-start w-100  fs-3"><span><i className="fa-solid fa-users fs-3"></i> </span> Encuentra freelancers</h5>
										<p className="card-text">Ningún trabajo es demasiado grande o complejo. Contamos con freelancers para trabajos de cualquier tamaño o presupuesto, en más de 2700 habilidades. Deja que nuestro talento haga realidad tus ideas.</p>
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
										<h5 className="card-title justify-content-start w-100  fs-3"><span><i className="fa-regular fa-credit-card fs-3"></i></span> Pagos seguros</h5>
										<p className="card-text">Solo paga por el trabajo cuando estés 100% satisfecho con el resultado. Nuestro sistema de pagos por hitos te protege en cada paso del camino..</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Reviews */}
						<div className="card mb-3">
							<div className="row g-0">


								<div className="col-4 ">
									<div className="d-flex align-items-center w-100">
										<div className="card-body d-flex flex-column p-4">
											<h5 className="card-title justify-content-start fs-3">Carlos</h5>
											<p className="card-text">"Excelente servicio de desarrollo web. La comunicación fue fluida y el resultado superó mis expectativas. Sin duda, recomendaría a este freelancer a otros." </p>
											{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4">
										{/* <img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." /> */}
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
											{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4 ">
										{/* <img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." /> */}
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
											{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
										</div>
									</div>
									<div className="w-100 d-flex flex-column align-items-center  p-4 ">
										{/* <img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." /> */}
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
						</div>


					</div>
				</div>
			</div>
		</div>
	);
};
