import React, { useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./SearchBar.module.css"
import {Context}  from "../store/appContext.js"

const SearchBar = () => {
  const [terminoBuqueda, setTerminoBuqueda] = useState("")
  const {_,actions}=useContext(Context) 
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
        placeholder='Barra de busqueda' />
      <div
        style={{ width: "50px", height: "100%" }}
        className={`d-flex justify-content-center align-items-center `}
      >
        <i className={`${styles.searchbar_icon} fa-solid fa-magnifying-glass `} ></i>
      </div>
    </div>
  )
}

export default SearchBar