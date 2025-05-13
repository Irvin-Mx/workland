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
        <div className='h-100 w-100 '>
            <h1>Ordenes</h1>
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
    )
}

export default FreelanceOrders