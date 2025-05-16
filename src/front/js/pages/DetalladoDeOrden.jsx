import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext.js"
import { useNavigate, useSearchParams } from "react-router-dom"
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
    const [serviceData, setServiceData] = useState({})
    const [loading, setLoading] = useState(true)

    // const user = searchParams.get('user');
    const service = searchParams.get('service');

    const fullName = `${store.userProfile.name} ${store.userProfile.last_name}`
    const fullNameFreelance = `${serviceData.user?.name} ${serviceData.user?.last_name}`


    useEffect(() => {
        if (actions.checkLogInUser() == false) {
            navigate("/iniciar-sesion")
        }

        actions.getSingleService(service)
            .then((res) => {
                setServiceData(res.result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const createOrderWhenAprove = async () => {
        await actions.createOrder({
            status: true,
            is_payed: true,
            price: serviceData.price,
            service_id: serviceData.id,
            user_id: serviceData.user.id,
            user_name: serviceData.user.name
        })
        navigate("/user/ordenes")
        // setModalOpen(true)
        return
    }

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: serviceData.price
                    },
                },
            ],
        });
    }

    const onApproveOrder = async (data, actions) => {
        // return actions.order.capture().then((details) => {
        await createOrderWhenAprove().then(() => {
            toastExito("Operaccion realizada con exito")
            // navigate("/ordenes")
        }).catch(() => {
            toastExito("Fallo la operacion")
        })

        // });
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

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
                Cargando...
            </div>
        )
    }
    if (serviceData.length == 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
                No existe el servicio
            </div>
        )
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 vh-100">
            <DetalleDeOrden service={fullNameFreelance} price={serviceData.price} fullName={fullName} description={serviceData.description} />
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