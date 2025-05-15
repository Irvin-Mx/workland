import React, { useContext, useEffect, useState } from 'react'
import Tabla from '../component/Tabla.jsx'
import { Context } from '../store/appContext.js'
import { useLocation } from 'react-router-dom';
import ContenidoVacioPlaceholder from '../component/ContenidoVacioPlaceholder.jsx';


const Ordenes = () => {
  const location = useLocation();
  const { store, actions } = useContext(Context)
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    actions.getOrders()
      .then((res) => {
        const arraySorted=res.result.sort((a, b) => a.id - b.id);

        setOrdenes(arraySorted)
      })
      .catch((err) => console.log(err))
      .finally(()=>setLoading(false))
  }, [location.pathname])
  
  if(loading==true){
        <div style={{ height: "100vh" }} className=' w-100 d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1 className='text-center'>Tabla de ordenes</h1>
      <h4>No hay ordenes </h4>
    </div>
  }
  
  
  return (

    <div style={{ height: "100vh" }} className=' w-100 d-flex align-items-start justify-content-start flex-column gap-2'>
      <div className="jumbotron w-100 m-0 jumbotron-fluid" style={{background:"aliceblue",padding: "1rem" }}>
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
                
                              <p className="display-6"><strong>Pedidos realizados</strong></p>
                         
                            
                
                
                            </div>
                          </div>
                        </div>
   


      {
        ordenes.length == 0 ?
          <ContenidoVacioPlaceholder mensaje={"No tienes ordenes creadas"}/>
          :
          <Tabla lista={ordenes} setOrdenes={setOrdenes} />

      }
    </div>
  )
}

export default Ordenes



