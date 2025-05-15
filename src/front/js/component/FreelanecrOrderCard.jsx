import React from 'react'
import { FaStar } from "react-icons/fa";

const FreelanecrOrderCard = ({ buyer_info, comment, service, id, is_payed, price }) => {
    console.log({ buyer_info, comment, service, id, is_payed, price })
    const title_font = "25px"
    const p_font = { fontSize: "20px" }
    return (
        <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            className='w-100  p-2 rounded-2'>

            <div >
                <h5 style={{ fontSize: title_font }} className='text-bold'>Servicio</h5>
                <div className='d-flex align-items-center justify-content-between flex-row'>
                    <p style={p_font}> Titulo: <strong>{service.service_title}</strong> </p>
                    <p style={p_font}>Categoria: <strong>{service.service_category}</strong> </p>
                    <p style={p_font}>Precio: <strong>${price}</strong> </p>
                </div>
            </div>
            <div>
                <h5 style={{ fontSize: title_font }} className='text-bold'>Comprador</h5>
                <div className='d-flex align-items-center justify-content-between flex-row'>
                    <p style={p_font}>Nombre: <strong>{buyer_info.buyer_full_name}</strong> </p>
                </div>
            </div>
            <div className='d-flex align-items-start justify-content-start flex-column'>
                <h5 style={{ fontSize: title_font }} className='text-bold'>Reseña</h5>
                <div className='d-flex align-items-center  w-100 flex-row'>
                    {
                        comment?.id ?
                            <div className='d-flex align-items-start justify-content-start w-100 flex-column '>
                                <p className='p-0 d-flex align-items-center' style={p_font}> <strong>Estrellas {comment.stars}</strong> <FaStar/></p>
                                <p style={{ fontSize: title_font }}> Comentario:<strong>{comment.text}</strong>   </p>
                            </div>
                            :
                            <p style={p_font}>No hay cometario</p>
                    }
                </div>
            </div>
            <div

            >
            </div>


        </div>
    )
}

export default FreelanecrOrderCard