import React from 'react'
import SearchBar from '../component/SearchBar.jsx'
import FreelanceCard from '../component/FreelanceCard.jsx'

const ResutadoDeBusqueda = () => {
  const testData = [
    {
      id: 1,
      user_name: "Nombre de freelance",
      title: "Desripcion titul",
    },
    {
      id: 2,
      user_name: "Nombre de freelance",
      title: "Desripcion titul",
    },
    {
      id: 3,
      user_name: "Nombre de freelance",
      title: "Desripcion titul",
    },
    {
      id: 4,
      user_name: "Nombre de freelance",
      title: "Desripcion titul",
    },
  ]
  return (
    <div className=" d-flex flex-column align-items-start vh-100  p-3" >
      <div>
        <SearchBar />
        <div className='w-100'>
          <h2>Resultado de busqueda</h2>
        </div>
        <div className='w-100 d-flex justify-content-between align-items-center flex-row flex-wrap'>
          {
            testData.map((elem) => <FreelanceCard key={elem.id} {...elem} />)
          }
        </div>
      </div>
    </div>
  )
}

export default ResutadoDeBusqueda