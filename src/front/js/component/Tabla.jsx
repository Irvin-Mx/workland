import React, { useState, useEffect } from 'react'
import styles from "./Tabla.module.css"
// import ModalCommponent from "../component/ModalCommponent.jsx";
import ModalCommponent from "../component/ModalCommponent.jsx"

const ButtonComment = ({ valor, setModalOpen, id, setModalInfoId, setModalOrderId, orderId }) => {
    if (!valor) {
        return (
            <p style={{textDecoration: 'underline' ,cursor:"pointer",color:"#097969	"}} onClick={() => {
                setModalOpen(true)
                setModalInfoId(id)
                setModalOrderId(orderId)

            }}>
                Comenta tu servicio
            </p>
        )

    }
    return (
        <p style={{color:"#880808"}}>
            Calificado
        </p>
    )
}



const Tabla = ({ lista, setOrdenes }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfoId, setModalInfoId] = useState(0)
    const [modalOrderId, setModalOrderId] = useState(0)

    const Row = ({ data }) => {
   
        const columnOrder = [ 'freelance_name', 'user_name', "price", "freelance_email", "freelance_phone", "comment_id"];
        return (
            <tr className='table-secondary'>
                {columnOrder.map(column => {
                    const valor = data[column];
                    if (column === "price") {
                        return (
                            <th
                                scope="row"
                                className={`text-center`}
                                key={valor}
                            >
                                {`$ ${valor}`}
                            </th>
                        );
                    }
                    if (column === "comment_id") {
                        return (
                            <td
                                scope="row"
                                className={`text-center`}
                        
                                key={valor}
                            >
                                <ButtonComment valor={valor} setModalOpen={setModalOpen} id={data["freelance_id"]} orderId={data["id"]} setModalOrderId={setModalOrderId} setModalInfoId={setModalInfoId} />
                            </td>
                        );
                    }
                    return (
                        <td
                        className={`text-center`}
                            key={valor}
                        >
                            {`${valor}`}
                        </td>
                    );
                })}
            </tr>
        );
    };


    return (
        <>
            <table className='table striped'>
                <thead 
                style={{ backgroundColor: "#1E266D", color: "white"}}
                className='thead-dark'
 
                >
                    <tr >
       
                        <td scope="col" 
          
                        >
                            Nombre de freelance
                        </td>
                        <td scope="col" 
          
                        >
                            Nombre de consumidor
                        </td>
                        <td scope="col" 
           
                        >
                            Precio
                        </td>

                        <td scope="col" 
           
                        >
                            Correo Electronico
                        </td>
                        <td scope="col" 
            
                         >
                            Teléfono
                        </td>
                        <td scope="col" 
       
                         >
                            Comentario
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item) => {
                        return <Row key={item.id} data={item} />;
                    })}
                </tbody>
            </table>
            <ModalCommponent modalOpen={modalOpen} setModalOpen={setModalOpen} freelance_id={modalInfoId} order_id={modalOrderId} setModalInfoId={setModalInfoId} setOrdenes={setOrdenes} />
        </>
    )
}

export default Tabla