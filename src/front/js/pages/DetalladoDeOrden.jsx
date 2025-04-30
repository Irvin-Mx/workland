import React from "react"

//components
import DetalleDeOrden from "../component/DetalleDeOrden.jsx"


import styles from "./DetalladoDeOrden.module.css"

const DetalladoDeOrden = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
            <DetalleDeOrden/>
        </div>
    )
}

export default DetalladoDeOrden