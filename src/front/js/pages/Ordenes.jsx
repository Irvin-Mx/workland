import React,{useContext, useEffect, useState} from 'react'
import Tabla from '../component/Tabla.jsx'
import { Context } from '../store/appContext.js'

const listaTest=[
    {
        id:1,
        nombreFreelance:"juan frelance",
        nombreConsumidor:"juan Consumidor",
        precio:100.00,
        status:"No pagada"
    },
    {
        id:2,
        nombreFreelance:"test frelance",
        nombreConsumidor:"test Consumidor",
        precio:100.00,
        status:"No pagada"
    },
    {
        id:3,
        nombreFreelance:"jose frelance",
        nombreConsumidor:"jose Consumidor",
        precio:100.00,
        status:"No pagada"
    },
]


const Ordenes = () => {
  const {store,actions}=useContext(Context)
  const [ordenes,setOrdenes]=useState([])
  useEffect(()=>{
    actions.getOrders()
    .then((res)=>{
      console.log(res,"ordenes")
      setOrdenes(res)
    })
    .catch((err)=>console.log(err))
  },[])
  return (
    <div style={{height:"100vh"}} className='container-fluid d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1>Tabla de ordenes</h1>
        <Tabla lista={listaTest}/>
    </div>
  )
}

export default Ordenes