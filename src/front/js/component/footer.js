import React, { Component } from "react";
import {Link} from "react-router-dom"

import styles from "./footer.module.css"

export const Footer = () => (
	<footer className={`footer mt-auto text-center p-5 border d-flex flex-column justify-content-center align-items-center ${styles.footer__container}`}>
		<div className="d-flex justify-content-around w-100">
			<div className="d-flex flex-column">
				<h2 className="text-white">Workland</h2>
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

			<div>
				<h3>Enlaces</h3>
				<ul>
					<li>
						<Link role="button" to="/">Home</Link>
					</li>
					<li>
						<Link role="button" to="/">Buscar</Link>
					</li>
					<li>
						<p>Nosotros</p>
					</li>
				</ul>
			</div>

			<div>
				<h3>Preguntas frecuentes</h3>
				<ul>
					<li>
						<p>Link1</p>
					</li>
					<li>
						<p>Link2</p>
					</li>
					<li>
						<p>Link3</p>
					</li>
				</ul>
			</div>

			<div>
				<h3>Legal</h3>
				<ul>
					<li>
						<p>Link1</p>
					</li>
					<li>
						<p>Link2</p>
					</li>
					<li>
						<p>Link3</p>
					</li>
				</ul>
			</div>
		</div>
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" Irvin, Fredy, Sebas "}
		</p>
	</footer>
);
