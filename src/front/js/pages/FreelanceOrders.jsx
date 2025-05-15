import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import FreelanecrOrderCard from '../component/FreelanecrOrderCard.jsx'

const FreelanceOrders = () => {
    const { actions, store } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        actions.getOrdersFreelance()
            .then((res) => {
                // console.log(res.result)
                setData(res.result)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(true))
    }, [])

    if (loading == false) {
        return (
            <div>Cargando...</div>
        )
    }
    return (
        <div className=' w-100 d-flex align-items-start justify-content-start flex-column gap-2'>
            <div className="jumbotron w-100 m-0" style={{ background: "aliceblue", padding: "1rem" }}>
                <div className="row aling-items-center">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img
                            src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747332934/ccheck_bi5wsr.png"
                            alt="Favoritos"
                            className="img-fluid rounded-start"
                            style={{ width: '250px' }}
                        />
                    </div>
                    <div className="col-md-8 align-items-center">

                        <p className="display-6"><strong>Mis proyectos</strong></p>
                    </div>
                </div>
                <div className='h-100 w-100 '>

                    <div className='d-flex justify-content-center flex-column  gap-3'>
                        {
                            data.length == 0 ?
                                <p>No hay ordenes
                                </p>
                                :
                                data.map((elem) => <FreelanecrOrderCard key={elem.id} {...elem} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreelanceOrders

