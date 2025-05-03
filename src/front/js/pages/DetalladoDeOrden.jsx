import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext.js"
import { useNavigate,useSearchParams  } from "react-router-dom"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toastFallo, toastExito } from "../component/Toaster/toasterIndex.jsx";

// /detallado-de-orden?service=1
//components
import DetalleDeOrden from "../component/DetalleDeOrden.jsx"
import styles from "./DetalladoDeOrden.module.css"



const DetalladoDeOrden = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const { store, actions } = useContext(Context)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [serviceData,setServiceData]=useState({})

    // const user = searchParams.get('user');
    const service = searchParams.get('service');

    const fullName=`${store.userProfile.name} ${store.userProfile.last_name}`

    useEffect(() => {
        if (actions.checkLogInUser() == false) {
            navigate("/iniciar-sesion")
        }

        actions.getSingleService(service).then((res)=>{
            console.log(res.result)
            setServiceData(res.result)
        }).catch((err)=>console.log(err))
    }, [])

    const createOrderWhenAprove=()=>{
        actions.createOrder({
            status:true,
            is_payed:true,
            price:serviceData.price,
            service_id:serviceData.id,
            user_id:serviceData.user.id,
            user_name:serviceData.user.name
        })
    }

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "10.00",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            createOrderWhenAprove()
            toastExito("Operaccion realizada con exito")
            navigate("/ordenes")

        });
    }
    const onCancelOrder = () => {
        toastFallo("Pago cancelado")
    }
    const onErrorOrder = () => {
        toastFallo("Error en pago")
    }



    const styles = {
        borderRadius: 15,
        layout: "vertical",
        shape: "rect",
        disableMaxWidth: true,
        width: "500px"
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
            <DetalleDeOrden service={service} fullName={fullName}/>
            <div style={{ width: "525px" }} className="checkout  ">
                {isPending ? <p>LOADING...</p> :
                    <PayPalButtons
                        onCancel={() => onCancelOrder()}
                        onError={() => onErrorOrder()}
                        style={styles}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                }
            </div>

        </div>
    )
}

export default DetalladoDeOrden