
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from "./navbarLateral.module.css"



const userLinks = [
    {
        name: "Favoritos",
        path: "/user/favoritos",
        icon: <i className="fa-solid fa-heart m-2"></i>
    },
    {
        name: "Ordenes",
        path: "/user/ordenes",
        icon: <i className="fa-solid fa-sheet-plastic m-2"></i>
    },
    {
        name: "Comentarios",
        path: "/user/comentarios",
        icon: <i className="fa-solid fa-comment m-2"></i>
    },
]

const freelanceLinks = [
    {
        name: "CV",
        path: "/free/cv",
        icon: <i className="fa-solid fa-business-time m-2"></i>
    },
    {
        name: "Layout",
        path: "/free/layout",
        icon: <i className="fa-solid fa-bag-shopping m-2"></i>
    },
    {
        name: "Vincular a Paypal",
        path: "https://www.paypal.com",
        icon: <i className="fas fa-fw fa-wallet m-2"></i>
    },
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
    } else if (user == "admin") {
        genLink = "user"
    }
    else {
        genLink = user
    }

    const generalLinks = [
        {
            name: "Home",
            path: "/",
            icon: <i className="fas fa-fw fa-tachometer-alt m-2"></i>
        },
        {
            name: "Dashboard",
            path: `/${genLink}/dashboard`,
            icon: <i className="fas fa-fw fa-tachometer-alt m-2"></i>
        }
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
            // <div className="d-flex">
            //     <ul className={`navbar-nav sidebar accordion vh-100 d-none d-md-block ${styles.sidebar} `} id="accordionSidebar">
            //         <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            //             <div className="sidebar-brand-icon rotate-n-15">
            //                 <i className="fa-solid fa-house"></i>
            //             </div>
            //             <div className="sidebar-brand-text mx-auto m-2">Workland</div>
            //         </a>
            //         <li className="w-100 p-0 m-0">
            //             <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
            //         </li>


            //         <li className="nav-item active">
            //             <Link className="nav-link" to="/dashboard">
            //                 <i className="fas fa-fw fa-tachometer-alt m-2"></i>
            //                 <span>Dashboard</span>
            //             </Link>
            //         </li>

            //         <li className="w-100 p-0 m-0">
            //             <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
            //         </li>

            //         <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}>Opciones</div>

            //         <li className="nav-item">
            //             <Link className="nav-link" to="/config">
            //                 <i className="fas fa-fw fa-user-edit m-2"></i>
            //                 <span>Editar Perfil</span>
            //             </Link>
            //         </li>

            //         <li className="nav-item">
            //             <Link className="nav-link" to="/free/cv">
            //                 <i className="fa-solid fa-business-time m-2"></i>
            //                 <span>Mis servicios</span>
            //             </Link>
            //         </li>

            //         <li className="nav-item">
            //             <a className="nav-link" href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
            //                 <i className="fas fa-fw fa-wallet m-2"></i>
            //                 <span>Vincular PayPal</span>
            //             </a>
            //         </li>

            //         <li className="w-100 p-0 m-0">
            //             <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
            //         </li>

            //         <div className="text-center d-none d-md-inline">
            //             <button className="rounded-circle border-0" id="sidebarToggle"></button>
            //         </div>
            //     </ul>

            //     <button
            //         className="btn btn-primary d-md-none"
            //         type="button"
            //         data-bs-toggle="collapse"
            //         data-bs-target="#accordionSidebar"
            //         aria-expanded="false"
            //         aria-controls="accordionSidebar"
            //     >
            //         <i className="fas fa-bars"></i>
            //     </button>
            // </div>
        );
    }


};

export default NavbarLateral;


