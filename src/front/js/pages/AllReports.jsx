import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import { toastExito,toastFallo } from '../component/Toaster/toasterIndex.jsx'

const ReportCard = ({ id, reason, text, author_info, recipient_info,setData }) => {
    const { store, actions } = useContext(Context)


    const deleteHandle = (id) => {
        actions.deleteReport({ report_id: id })
            .then((res) => {
                toastExito(res.msj)
                actions.getAllReports().then((res) => setData(res.result))
            })
            .catch((err) => toastFallo(err.msj))
    }

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="card container-fluid" >
            <div className="card-body">
                <div className='d-flex justify-content-between align-content-center flex-row'>
                    <div className='d-flex justify-content-start align-content-center flex-row w-100 gap-3'>

                        <div className='d-flex justify-content-start align-content-center flex-row gap-2'>
                            <p className='m-0 '>Autor: </p>
                            <h5 className='m-0'>
                                {`${author_info.full_name}  `}
                            </h5>
                        </div>
                        <div className='d-flex justify-content-start align-content-center flex-row gap-2'>
                            <p className='m-0 ml-1'>Receptor:</p>
                            <h5 className='m-0'>
                                {`${recipient_info.full_name}  `}
                            </h5>
                        </div>
                    </div>
                    <button
                        onClick={() => deleteHandle(id)}
                        className='btn btn-danger'>
                        <i className="fa-solid fa-trash"></i>
                    </button>

                </div>
                <hr />
                <div>
                    <div className='d-flex justify-content-start align-content-center flex-row gap-2'>
                        <p className='m-0 '>Razon: </p>
                        <h5 className='m-0'>
                            {`${reason}  `}
                        </h5>
                    </div>
                    <p style={{ fontSize: "1.5rem" }} className="w-full ">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}

const AllReports = () => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        actions.getAllReports()
            .then((res) => {
                setData(res.result)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) })
    }, [])

    if (loading == true) {
        return (<div className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <h2>
                Cargando...
            </h2>
        </div>)
    }

    return (
        <div className='w-100 h-100  d-flex align-content-center flex-column gap-1'>
            <h2>Lista de reportes</h2>
            {
                data?.length == 0 ?
                    <h2>
                        No hay reportes.
                    </h2>
                    :
                    data?.map((elem) => <ReportCard key={elem.id} {...elem} setData={setData} />)

            }
        </div>
    )
}

export default AllReports