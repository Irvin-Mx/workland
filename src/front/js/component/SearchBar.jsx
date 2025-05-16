import React, { useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./SearchBar.module.css"
import {Context}  from "../store/appContext.js"
import { toastFallo } from './Toaster/toasterIndex.jsx'

const SearchBar = () => {
  const {store,actions}=useContext(Context) 
  const [terminoBuqueda, setTerminoBuqueda] = useState(store.terminoBusqueda)
  const handleChange = (e) => {
    setTerminoBuqueda(e.target.value)
  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      actions.busquedaFreelancers(terminoBuqueda)
      setTerminoBuqueda("")
    }
  };
  return (
    <div className={`${styles.searchbar_container} d-flex justify-content-center align-items-center flex-row`}>
      <input
        className={`${styles.searchbar_input}`}
        value={terminoBuqueda}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder='Barra de búsqueda' />
      <button
       onClick={()=>{

        actions.busquedaFreelancers(terminoBuqueda)
      }}
        style={{ width: "40px", height: "40px", cursor:"pointer", backgroundColor:"#00D1B2", color: "white", border:'none' }}
        className={`d-flex justify-content-center align-items-center rounded `}
      >
        <i 
        className={`${styles.searchbar_icon} fa-solid fa-magnifying-glass `}
        style={{backgroundColor:"#00D1B2"}}  ></i>
      </button>
    </div>
  )
}

export default SearchBar


