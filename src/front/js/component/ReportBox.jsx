import React, { useContext, useEffect, useState, } from 'react'
import { Context } from "../store/appContext.js";
import { useForm } from "react-hook-form"
import ImageLoader from './ImageLoader.jsx';
import { toastExito, toastFallo } from './Toaster/toasterIndex.jsx';
import { useNavigate } from 'react-router-dom';



const ReportBox = ({ freelance_id, setModalOpen }) => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const MAX_CHARACTERS = 200
    const msj = watch("text")
    const rea = watch("reason")

    const onSubmit = (data) => {

        actions.addReport({
            text: data.text,
            freelance_id: freelance_id,
            reason:data.reason
        })
            .then((res) => {

                toastExito(res.msj)
                setModalOpen(false)

            })
            .catch((err) => toastFallo(err.msj))
        // .finally(()=> navigate("/ordenes"))

    }



    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="card container-fluid" >
            <div className="card-body">
                <div className='d-flex justify-content-start align-content-center flex-row'>
                    <div className="rounded-circle" style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                        <ImageLoader
                            src={store.userProfile?.img_url}
                            alt='Imagen por defecto'
                            width="100%"
                            height="100%"
                        />

                    </div>

                    <h4 className='m-0 p-0 d-flex justify-content-start align-items-center'>
                        {`${store.userProfile.name} ${store.userProfile.last_name} `}
                    </h4>


                </div>
                <hr />
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-start align-content-center flex-column mb-2'>
                        <div  className='w-full'>
                            <label htmlFor="disabledSelect" className="form-label">Selecciona el modo de perfil{rea}</label>
                            <select
                                {...register("reason")}
                                id="disabledSelect" name="rol" className="form-select" 
                       
                               >
                                <option value="">Selecciona una opción</option>
                                <option value="No pago.">No pago.</option>
                                <option value="Parece fraude.">Parece fraude.</option>
                                <option value="Comentarios ofensivos.">Comentarios ofensivos.</option>
                            </select>
                            <div style={{ height: "20px" }}>
               
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                Comenta aquí <span className={`${msj?.length >= MAX_CHARACTERS ? "text-danger" : "text-black"}`}>({msj?.length || 0}/200 caracteres)</span>
                            </label>
                            <textarea
                            

                                {...register("text", { required: true, maxLength: MAX_CHARACTERS, pattern: /.+/ })}
                                style={{ resize: 'none' }} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div style={{ height: "30px" }} className='w-full'>
                            {
                                errors.text && errors.text.type === "required" && <span className='text-white bg-danger'>Esto debe de ser incluido.</span>
                            }
                            {
                                errors.text && errors.text.type === "pattern" && <span className='text-white bg-danger'>Minimo un caracter.</span>
                            }
                            {
                                errors.text && errors.text.type === "maxLength" && <span className='text-white bg-danger'>Sobrepasa el limite de carateres.</span>
                            }
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportBox