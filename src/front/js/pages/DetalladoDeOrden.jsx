import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext.js"
import { useNavigate } from "react-router-dom"
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { toastFallo,toastExito } from "../component/Toaster/toasterIndex.jsx";

//components
import DetalleDeOrden from "../component/DetalleDeOrden.jsx"
import styles from "./DetalladoDeOrden.module.css"


const DetalladoDeOrden = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    // const onCreateOrder = (data, actions) => {
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 amount: {
    //                     value: "10.00",
    //                 },
    //             },
    //         ],
    //     });
    // }

    // const onApproveOrder = (data, actions) => {
    //     return actions.order.capture().then((details) => {
    //         toastExito("Operaccion realizada con exito")
    //         console.log(details)
    //         navigate("/ordenes")
            
    //     });
    // }
    // const onCancelOrder = () => {
    //     toastFallo("Pago cancelado")
    // }
    // const onErrorOrder = () => {
    //     toastFallo("Error en pago")
    // }

    useEffect(() => {

        if (actions.checkLogInUser() == false) {

            navigate("/iniciar-sesion")
        }

    }, [])

    const styles = {
        borderRadius: 15,
        layout: "vertical" ,
        shape:"rect",
        disableMaxWidth:true,
        width:"500px"
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
            <DetalleDeOrden />
            {/* <div style={{width:"525px"}} className="checkout  ">
  {isPending ? <p>LOADING...</p> : 
        <PayPalButtons 
        onCancel={()=>onCancelOrder()}
        onError={()=>onErrorOrder()}
        style={styles}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApproveOrder(data, actions)}
        />
   }
</div> */}

        </div>
    )
}

export default DetalladoDeOrden