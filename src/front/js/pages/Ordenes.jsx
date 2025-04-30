import React from 'react'
import Tabla from '../component/Tabla.jsx'

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
  return (
    <div style={{height:"100vh"}} className='container-fluid d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1>Tabla de ordenes</h1>
        <Tabla lista={listaTest}/>
    </div>
  )
}

export default Ordenes