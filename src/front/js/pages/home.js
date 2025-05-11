import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toastFallo } from "../component/Toaster/toasterIndex.jsx";
import "../../styles/home.css";

import styles from "./home.module.css"


export const Home = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	const [terminoBusqueda, setTerminoBusqueda] = useState(store.terminoBusqueda)
	const handleChange = (e) => {
		setTerminoBusqueda(e.target.value)
	}

	const handleKeyDown = (e) => {

		if (e.key === "Enter") {
			actions.changeSearchTerm(terminoBusqueda)
			setTerminoBusqueda("")
			navigate("/busqueda")
		}
	};


	return (
		<div className="text-center">
			<div>
				<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
					<ol className="carousel-indicators">
						<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					</ol>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="First slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Second slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Third slide" />
						</div>
					</div>
					<div className="input-group mb-3 w-50 position-absolute top-50 start-50 translate-middle">
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
								navigate("/busqueda");
							}}
							className="btn btn-outline-secondary"
							type="button"
							id="button-addon2"
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>

					<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
				<div className="row align-items-center">
					<div className="col">
						Conexión rápida
					</div>
					<div className="col">
						Gestión integral
					</div>
					<div className="col">
						One of three columns
					</div>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<div className="w-75">
						{/* Card */}
						<div className="card mb-3 ">
							<div className="row g-0 ">
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">
										<h5 className="card-title justify-content-start w-100  fs-3">Publica tu trabajo</h5>
										<p className="card-text">It's free and easy! Get lots of competitive bids that suit your budget in minutes. Start making your dreams reality.</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Card */}
						<div className="card mb-3">
							<div className="row g-0 ">
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">
										<h5 className="card-title justify-content-start w-100  fs-3">Encunetra freelancers</h5>
										<p className="card-text">No job is too big or complex. We've got freelancers for jobs of any size or budget, across 2700+ skills. Let our talent bring your ideas to life.</p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
							</div>
						</div>

						{/* Card */}
						<div className="card mb-3 ">
							<div className="row g-0 ">
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">
										<h5 className="card-title justify-content-start w-100  fs-3">Pagos seguros</h5>
										<p className="card-text">Only pay for work when you are 100% satisfied with the outcome. Our milestone payment system protects you every step of the way.</p>
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
											<h5 className="card-title justify-content-start fs-3">Lorem</h5>
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
											<h5 className="card-title justify-content-start fs-3">Lorem</h5>
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
											<h5 className="card-title justify-content-start fs-3">Lorem</h5>
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
