import React from "react";
import { Link } from "react-router-dom";

//syles
import styles from "./navbar.module.css"

export const Navbar = () => {
	return (
		<nav className={`${styles.navbar__container} navbar navbar-expand-lg bg-body-tertiary`}>
			<div className="container-fluid">
				<a className={`${styles.navbar__brand} navbar-brand fs-2 `} href="#">Workland</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="w-100">
						<div class="d-grid gap-2 d-md-flex justify-content-md-end">
							<button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button>
							<button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
