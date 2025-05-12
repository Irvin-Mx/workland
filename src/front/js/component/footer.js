import React, { Component } from "react";
import {Link} from "react-router-dom"

import styles from "./footer.module.css"

export const Footer = () => (
	<footer className={`footer mt-auto text-center p-4 border d-flex flex-column justify-content-center align-items-center text-white ${styles.footer__container}`}>
		<div className="d-flex justify-content-around w-100">
			{/* Logo */}
			<div className="d-flex flex-column">
				<h2 className="">Workland</h2>
				<div className="d-flex justify-content-between">
					<div>
						<i class="fa-brands fa-twitter fs-4"></i>
					</div>

					<div>
						<i class="fa-brands fa-instagram fs-4"></i>
					</div>

					<div>
						<i class="fa-brands fa-facebook-f fs-4"></i>
					</div>
				</div>
			</div>
			{/* Enlaces */}
			<div>
				<h4>Enlaces</h4>
				<ul className={` ${styles.footer__ul}`}>
					<li >
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Home</Link>
					</li>
					<li>
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Buscar</Link>
					</li>
					<li>
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Nosotros</Link>
					</li>
				</ul>
			</div>
			{/* Preguntas frecuntes */}
			<div>
				<h4>Preguntas frecuentes</h4>
				<ul className={` ${styles.footer__ul}`} >
					<li>
						<Link className={` ${styles.footer__links}`} role="button" to="/">¿Cómo funciona el proceso de contratación?</Link>
					</li>
					<li>
						<Link className={` ${styles.footer__links}`} role="button" to="/">¿Qué tipos de trabajos o servicios pueden realizarse en la plataforma?</Link>
					</li>
					<li>
						<Link className={` ${styles.footer__links}`} role="button" to="/">¿Cómo me protege el sistema de pagos seguro?</Link>
					</li>
				</ul>
			</div>
			{/* Legal*/}
			<div>
				<h4>Legal</h4>
				<ul className={` ${styles.footer__ul}`} >
					<li>
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Terminos y condiciones</Link>
					</li>
					<li>
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Politica de privacidad</Link>
					</li>
					<li>
						<Link className={`fw-light ${styles.footer__links}`} role="button" to="/">Contrato de servicios</Link>
					</li>
				</ul>
			</div>
		</div>
		<p className="">
			Made with <i className="fa fa-heart text-danger" /> by{" Irvin, Fredy, Sebas "}
		</p>
	</footer>
);
