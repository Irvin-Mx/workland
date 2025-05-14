import React from 'react'

const ContenidoVacioPlaceholder = ({mensaje}) => {
  return (
    <div style={{height:"18rem"}} className='rounded w-100 text-white d-flex align-items-center justify-content-center'>
        <p className='text-secondary' style={{fontSize:"25px"}}>
            {mensaje}
        </p>
    </div>
  )
}

export default ContenidoVacioPlaceholder