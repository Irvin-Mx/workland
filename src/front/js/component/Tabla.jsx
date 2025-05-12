import React, { useState, useEffect } from 'react'
import styles from "./Tabla.module.css"
// import ModalCommponent from "../component/ModalCommponent.jsx";
import ModalCommponent from "../component/ModalCommponent.jsx"

const ButtonComment = ({ valor, setModalOpen, id,setModalInfoId,setModalOrderId,orderId }) => {
    if (!valor) {
        return (
            <button className='btn btn-success' onClick={()=>{
                setModalOpen(true)
                setModalInfoId(id)
                setModalOrderId(orderId)
                
                }}>
                Comenta tu servicio
            </button>
        )

    }
    return (
        <button className='btn btn-danger'>
            Ya calificaste tu servicio
        </button>
    )
}



const Tabla = ({ lista,setOrdenes }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfoId, setModalInfoId] = useState(0)
    const [modalOrderId, setModalOrderId] = useState(0)

    const Row = ({ data }) => {
        // console.log(data)
        const columnOrder = ['id', 'freelance_name', 'user_name', "price", "freelance_email", "freelance_phone", "comment_id"];
        return (
            <tr>
                {columnOrder.map(column => {
                    const valor = data[column];
                    if (column === "id") {
                        return (
                            <th
                                scope="row"
                                className={`${styles.tabla_td}`}
                                key={valor}
                            >
                                {`${valor}`}
                            </th>
                        );
                    }
                    if (column === "comment_id") {
                        return (
                            <td
                                scope="row"
                                className={`${styles.tabla_td}`}
                                key={valor}
                            >
                                <ButtonComment valor={valor} setModalOpen={setModalOpen} id={data["freelance_id"]} orderId={data["id"]} setModalOrderId={setModalOrderId}  setModalInfoId={setModalInfoId} />
                            </td>
                        );
                    }
                    return (
                        <td
                            className={`${styles.tabla_td}`}
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
            <table className='table '>
                <thead style={{ backgroundColor: "#1E266D", color: "white" }} >
                    <tr >
                        <td scope="col" className={`${styles.tabla_td} `} >
                            id
                        </td>
                        <td scope="col" className={`${styles.tabla_td} `} >
                            Nombre de freelance
                        </td>
                        <td scope="col" className={`${styles.tabla_td} `} >
                            Nombre de consumidor
                        </td>
                        <td scope="col" className={`${styles.tabla_td} `} >
                            precio
                        </td>

                        <td scope="col" className={`${styles.tabla_td} `} >
                            correo
                        </td>
                        <td scope="col" className={`${styles.tabla_td} `} >
                            telefono
                        </td>
                        <td scope="col" className={`${styles.tabla_td} `} >
                            comentario
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