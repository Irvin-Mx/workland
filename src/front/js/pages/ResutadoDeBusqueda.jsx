import React, { useContext, useState, useEffect } from 'react'
import SearchBar from '../component/SearchBar.jsx'
import FreelanceCard from '../component/FreelanceCard.jsx'
import { Context } from '../store/appContext.js'

const ResutadoDeBusqueda = () => {
  const { store, actions } = useContext(Context)

  useEffect(() => {
    if (!!store.terminoBusqueda) {
      actions.busquedaFreelancers(store.terminoBusqueda)
    }
  }, [])

  return (
    <div className=" d-flex flex-column align-items-start h-100 p-3" >
      <div>
        <SearchBar />
        <div className='w-100'>
          <h2>Resultado de búsqueda</h2>
        </div>
        <div className='w-100 h-100 d-flex justify-content-around flex-row flex-wrap'>
          {
            store.resutadosBusqueda.length ?
              store.resutadosBusqueda.map((elem) => <FreelanceCard key={elem.id} {...elem} />)
              :

              <div className='w-100 h-100 d-flex justify-content-around align-items-center flex-row flex-wrap' >
                <h3 className='text-secondary'>No hay resultados de búsqueda</h3>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResutadoDeBusqueda