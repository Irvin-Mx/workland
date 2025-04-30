import React, {useEffect,useContext} from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

//syles
import styles from "./navbar.module.css"

export const Navbar = () => {
	const {store,actions} = useContext(Context)
	let location = useLocation()
	const navigate = useNavigate()

	useEffect(()=>{
	// 	let location = useLocation()
	// 	console.log(location)
	
	//console.log(store.userToken)
	})

	const handleLogOut = ()=>{
		actions.logOut()
		navigate("/")
	}


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
							{/* if user in home, show register button */}
							{location.pathname === "/" && !localStorage.userToken? <Link to="/registro"><button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button></Link>  : null}
							{location.pathname === "/" && !localStorage.userToken? <Link to="/iniciar-sesion"><button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button></Link>  : null}
							<Link to="/iniciar-sesion"><button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button></Link>
							{/* if user in register, show login button */}
							{location.pathname === "/registro"? <Link to="/iniciar-sesion"><button className={`${styles.navbar__btn__login} btn me-md-2`} type="button">Iniciar sesion</button></Link> : null}
							
							{/* if user in login, show register button */}
							{location.pathname === "/iniciar-sesion"? <Link to="/registro"><button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button></Link> : null}

							{/* if token exists in localstorage or in store, show logout button */}
							{localStorage.userToken || store.userToken? <Link to="/"><button onClick={handleLogOut} className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Logout</button></Link> : null}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
