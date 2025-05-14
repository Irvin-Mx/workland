
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";


import styles from "./navbarLateral.module.css"



const userLinks = [
    {
        name: "Favoritos",
        path: "/user/favoritos",
        icon: <i className="fa-solid fa-xl fa-heart m-2"></i>
    },
    {
        name: "Ordenes",
        path: "/user/ordenes",
        icon: <i className="fa-solid fa-xl fa-sheet-plastic m-2"></i>
    },
    {
        name: "Comentarios",
        path: "/user/comentarios",
        icon: <i className="fa-solid fa-xl fa-comment m-2"></i>
    },
]

const freelanceLinks = [
    {
        name: "CV",
        path: "/free/cv",
        icon: <i className="fa-solid fa-id-badge fa-xl m-2"></i>
    },
    {
        name: "Mis servicios",
        path: "/free/layout",
        icon: <i className="fa-solid fa-xl fa-business-time m-2"></i>
    },
    {
        name: "Mis Ordenes",
        path: "/free/ordenes",
        icon: <i className="fa-solid fa-bag-shopping  fa-xl m-2"></i>
    },
    {
        name: "Vista previa perfil",
        path: "/free/vista-previa",
        icon: <i className="fa-solid fa-eye  fa-xl m-2"></i>
    },
    {
        name: "Paypal",
        path: "https://www.paypal.com",
        icon: <i className="fa-brands fa-paypal fa-xl m-2"></i>
    },
]
const adminLink = [
    {
        name: "Reportes",
        path: "/admin",
        icon: <i className="fa-solid fa-xl fa-business-time m-2"></i>
    }
    
]

const LinkItem = ({ name, path, icon }) => {
      const isExternal = name === "Vincular a Paypal";
    if (isExternal) {
        return (
            <li className="nav-item active">
                <a className="nav-link" href={`${path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {icon}
                    <span>{name}</span>
                </a>
            </li>
        )
    }
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={`${path}`}>
                {icon}
                <span>{name}</span>
            </Link>
        </li>
    )

}


const NavbarLateral = ({ user }) => {
    let genLink

    if (user === "freelance") {
        genLink = "free"
    } else if (user == "user") {
        genLink = "user"
    }
    else {
        genLink = "admin"
    }

    const generalLinks = [
        // {
        //     name: "Inicio",
        //     path: "/",
        //     icon: <i className="fas fa-fw fa-tachometer-alt m-2"></i>
        // },
        {
            name: "Panel principal",
            path: `/${genLink}/dashboard`,
            icon: <i className="fas fa-xl fa-tachometer-alt m-2"></i>
        },
        {
            name: "Perfil",
            path: `/${genLink}/config`,
            icon: <i className="fa-solid fa-address-card fa-xl m-2"></i>
        },
        {
            name: "Busqueda",
            path: `/${genLink}/busqueda`,
            icon: <i className="fa-solid fa-xl fa-magnifying-glass m-2"></i>
        },
        // {
        //     name: "Edit",
        //     path: `/${genLink}/form`,
        //     icon: <i className="fas fa-fw fa-tachometer-alt m-2"></i>
        // },
    ]
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoading(false)
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, [])

    if (user == "user") {
        return (
            <div className="d-flex">
                <ul className={`navbar-nav sidebar accordion vh-100 d-none d-md-block ${styles.sidebar} `} id="accordionSidebar">
                    <div >
                        {
                            generalLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                    <div >
                        <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}><h5>Opciones</h5> </div>
                        {
                            userLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                </ul>

                {/* Botón de colapso para dispositivos pequeños */}
                {/* <button
                    className="btn btn-primary d-md-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionSidebar"
                    aria-expanded="false"
                    aria-controls="accordionSidebar"
                >
                    <i className="fas fa-bars"></i>
                </button> */}
            </div>
        );
    }
    if (user == "freelance") {
        return (

            <div className="d-flex">
                <ul className={`navbar-nav sidebar accordion vh-100 d-none d-md-block ${styles.sidebar} `} id="accordionSidebar">
                    <div >
                        {
                            generalLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                    <div >
                        <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}><h5>Opciones</h5> </div>
                        {
                            freelanceLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                </ul>

            </div>
          
        );
    }
    if (user == "admin") {
        return (

            <div className="d-flex">
                <ul className={`navbar-nav sidebar accordion vh-100 d-none d-md-block ${styles.sidebar} `} id="accordionSidebar">
                    <div >
                        {
                            generalLinks.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                    <div >
                        <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}><h5>Opciones</h5> </div>
                        {
                            adminLink.map((elem) => <LinkItem key={elem.name} {...elem} />)
                        }
                    </div>
                </ul>

            </div>
          
        );
    }


};

export default NavbarLateral;


