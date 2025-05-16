import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "./navbarLateral.module.css";

// Links para usuarios normales
const userLinks = [
    { name: "Favoritos", path: "/user/favoritos", icon: <i className="fa-solid fa-xl fa-heart m-2"></i> },
    { name: "Órdenes", path: "/user/ordenes", icon: <i className="fa-solid fa-xl fa-sheet-plastic m-2"></i> },
    { name: "Comentarios", path: "/user/comentarios", icon: <i className="fa-solid fa-xl fa-comment m-2"></i> },
];

// Links para freelancers
const freelanceLinks = [
    { name: "CV", path: "/free/cv", icon: <i className="fa-solid fa-id-badge fa-xl m-2"></i> },
    { name: "Mis servicios", path: "/free/layout", icon: <i className="fa-solid fa-xl fa-business-time m-2"></i> },
    { name: "Mi vista previa", path: "/free/vista-previa", icon: <i className="fa-solid fa-eye fa-xl m-2"></i> },
    { name: "Mis proyectos", path: "/free/ordenes", icon: <i className="fa-solid fa-bag-shopping fa-xl m-2"></i> },
    { name: "Paypal", path: "https://www.paypal.com", icon: <i className="fa-brands fa-paypal fa-xl m-2"></i> },
];

// Links para administradores
const adminLink = [
    { name: "Reportes", path: "/admin", icon: <i className="fa-solid fa-xl fa-business-time m-2"></i> }
];

// Componente de ítem de navegación
const LinkItem = ({ name, path, icon }) => {
    const [hover, setHover] = useState(false);
    const location = useLocation();

    const isActive = location.pathname === path;
    const isExternal = path.startsWith("http");

    const baseStyle = {
        color: hover || isActive ? '#249483' : '#1E3E6D', 
        backgroundColor: hover || isActive ? '#e4ecf7' : 'transparent',
        textDecoration: 'none',
      
        padding: '10px 12px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        transition: 'all 0.2s ease',
        fontSize: isActive ? '16px'  : '15px',
        marginTop:'12px'
    };

    const iconStyle = {
        marginRight: '10px',
        color: hover || isActive ? '#249483' : '#1E3E6D',
    };

    if (isExternal) {
        return (
            <li className="nav-item">
                <a
                    className="nav-link"
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={baseStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <span style={iconStyle}>{icon}</span>
                    <span>{name}</span>
                </a>
            </li>
        );
    }

    return (
        <li className="nav-item">
            <Link
                className="nav-link"
                to={path}
                style={baseStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <span style={iconStyle}>{icon}</span>
                <span>{name}</span>
            </Link>
        </li>
    );
};

// Componente principal de barra lateral
const NavbarLateral = ({ user }) => {
    let genLink = user === "freelance" ? "free" : user === "user" ? "user" : "admin";

    const generalLinks = [
        { name: "Panel principal", path: `/${genLink}/dashboard`, icon: <i className="fas fa-xl fa-tachometer-alt m-2"></i> },
        { name: "Perfil", path: `/${genLink}/config`, icon: <i className="fa-solid fa-address-card fa-xl m-2"></i> },
        {
        name: user === "freelance" ? "Comunidad" : "Búsqueda",
        path: `/${genLink}/busqueda`,
        icon: <i className="fa-solid fa-xl fa-magnifying-glass m-2"></i>
    },
    ];

    const renderLinks = (specificLinks) => (
        <ul style={{minHeight:"100vh",height:"100%"}} className={`navbar-nav sidebar accordion  d-none d-md-block ${styles.sidebar}`} id="accordionSidebar">
            <div>
                {generalLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)}
            </div>
            {specificLinks.length > 0 && (
                <div>
                    <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}>
                        <h5>Opciones</h5>
                    </div>
                    {specificLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)}
                </div>
            )}
        </ul>
    );

    return (
        <div style={{minHeight:"100vh",height:"100%"}} className="d-flex">
            {user === "user" && renderLinks(userLinks)}
            {user === "freelance" && renderLinks(freelanceLinks)}
            {user === "admin" && renderLinks(adminLink)}
        </div>
    );
};

export default NavbarLateral;
