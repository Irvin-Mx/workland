import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export const Footer = () => (
  <footer className={`text-white p-4 ${styles.footer__container}`}>
    <div className="container">
      <div className="row justify-content-around text-start">
        
        {/* Logo Column */}
        <div className="col-md-3 mb-4">
          <h2>Workland</h2>
          <div className="d-flex gap-3 fs-4">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook-f"></i>
          </div>
        </div>

        {/* Enlaces Column */}
        <div className="col-md-2 mb-4">
          <h4>Enlaces</h4>
          <ul className={`list-unstyled ${styles.footer__ul}`}>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">Inicio</Link></li>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">Buscar</Link></li>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/el-equipo">Nosotros</Link></li>
          </ul>
        </div>

        {/* Preguntas Frecuentes Column */}
        <div className="col-md-4 mb-4">
          <h4>Preguntas frecuentes</h4>
          <ul className={`list-unstyled ${styles.footer__ul}`}>
            <li>
              <Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">
                ¿Cómo funciona el proceso de contratación?
              </Link>
            </li>
            <li>
              <Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">
                ¿Qué tipos de trabajos o servicios pueden realizarse en la plataforma?
              </Link>
            </li>
            <li>
              <Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">
                ¿Cómo me protege el sistema de pagos seguro?
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="col-md-2 mb-4">
          <h4>Legal</h4>
          <ul className={`list-unstyled ${styles.footer__ul}`}>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/" role="button">Términos y condiciones</Link></li>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">Política de privacidad</Link></li>
            <li><Link className={`text-white text-decoration-none fw-light ${styles.footer__links}`} to="/">Contrato de servicios</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Text */}
      <hr className="text-white" />
      <p className="text-center mt-3">
        Made with <i className="fa fa-heart text-danger" /> by{" Irvin, Fredy, Sebas "}
      </p>
    </div>
  </footer>
);