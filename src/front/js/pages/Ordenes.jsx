import React, { useContext, useEffect, useState } from 'react'
import Tabla from '../component/Tabla.jsx'
import { Context } from '../store/appContext.js'
import { useLocation } from 'react-router-dom';


const Ordenes = () => {
  const location = useLocation();
  const { store, actions } = useContext(Context)
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    actions.getOrders()
      .then((res) => {

        setOrdenes(res.result)
      })
      .catch((err) => console.log(err))
      .finally(()=>setLoading(false))
  }, [location.pathname])
  
  if(loading==true){
        <div style={{ height: "100vh" }} className=' w-100 d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1>Tabla de ordenes</h1>
      <h4>No hay ordenes </h4>
    </div>
  }
  
  
  return (
    <div style={{ height: "100vh" }} className=' w-100 d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1>Tabla de ordenes</h1>
      {
        ordenes.length == 0 ?
          <p>NO hay ordenes</p>
          :
          <Tabla lista={ordenes} setOrdenes={setOrdenes} />

      }
    </div>
  )
}

export default Ordenes