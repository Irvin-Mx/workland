import React, {useEffect} from "react";
import { Link,useLocation } from "react-router-dom";

//syles
import styles from "./navbar.module.css"

export const Navbar = () => {
	let location = useLocation()

	// useEffect(()=>{
	// 	let location = useLocation()
	// 	console.log(location)
	// })
	useEffect(()=>{
		console.log(location.pathname)
	})


	return (
		<nav className={`${styles.navbar__container} navbar navbar-expand-lg bg-body-tertiary`}>
			<div className="container-fluid">
				{/* <a className= href="">Workland</a> */}
				<Link to="/" className={`${styles.navbar__brand} navbar-brand fs-2 `} >Workland</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="w-100">
						<div className="d-grid gap-2 d-md-flex justify-content-md-end">
							{/* if user in login, show register button */}
							{location.pathname === "/"? <Link to="/registro"><button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button></Link>  : null}
							{location.pathname === "/"? <Link to="/login"><button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button></Link>  : null}
							
							{/* if user in register, show login button */}
							{location.pathname === "/register"? <Link to="/login"><button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button></Link> : null}
							
							{/* if user in login, show register button */}
							{location.pathname === "/login"? <Link to="/registro"><button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button></Link> : null}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
