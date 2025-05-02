import React,{useContext,useEffect} from "react"
import { Context } from "../store/appContext.js"
import { useNavigate } from "react-router-dom"

//components
import DetalleDeOrden from "../component/DetalleDeOrden.jsx"
import styles from "./DetalladoDeOrden.module.css"


const DetalladoDeOrden = () => {
    const navigate=useNavigate()
    const {store,actions}=useContext(Context)

    useEffect(()=>{
        
        if(actions.checkLogInUser()==false){

            navigate("/iniciar-sesion")
        }

    },[])
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
            <DetalleDeOrden/>
        </div>
    )
}

export default DetalladoDeOrden