import React, { useContext, useState, useEffect } from 'react'
import SearchBar from '../component/SearchBar.jsx'
import FreelanceCard from '../component/FreelanceCard.jsx'
import { Context } from '../store/appContext.js'
import style from './ResultadoDeBusqueda.module.css'

const ResutadoDeBusqueda = () => {
  const { store, actions } = useContext(Context)

  useEffect(() => {
    if (!!store.terminoBusqueda) {
      actions.busquedaFreelancers(store.terminoBusqueda)
    }
  }, [])

  return (

    <div className=" d-flex flex-column align-items-start" style={{margin:'0' }}>
      <div className='w-100' style={{margin:'0' }}>
        <div className="jumbotron w-100 m-0 jumbotron-fluid" style={{background:"aliceblue",padding: "1rem" }}>
          <div className="row aling-items-center">
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747238568/user-11_pp5ndn.png"
                alt="busqueda"
                className="img-fluid rounded-start"
                style={{ width: '250px' }}
              />
            </div>
            <div className="col-md-8 align-items-center">

              <p className="h4"> ¡Encuentra tu servicio!</p>
              <SearchBar />
            


            </div>
          </div>
        </div>
        <div className='w-100 h-100 d-flex justify-content-around flex-row flex-wrap'>
          {
            store.resutadosBusqueda.length ?
              store.resutadosBusqueda.map((elem) => <FreelanceCard key={elem.id} {...elem} />)
              :

              <div className='w-100 h-100 d-flex justify-content-around align-items-center flex-row flex-wrap' >
                <p className='text-muted h6 mt-2'>Sin resultados aún, ¡Comienza tu búsqueda!</p>
              </div>
          }
        </div>

      </div>
    </div>

  )
}

export default ResutadoDeBusqueda
