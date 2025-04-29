import React from 'react'
import styles from "./SearchBar.module.css"

const SearchBar = () => {
  return (
    <div  className={`${styles.searchbar_container} d-flex justify-content-center align-items-center flex-row`}> 
        <input 
        className={`${styles.searchbar_input}`}
        type="text" 
        placeholder='Barra de busqueda' />
        <div
        style={{width:"50px",height:"100%"}}
        className={`d-flex justify-content-center align-items-center `}
        >
        <i  className={`${styles.searchbar_icon} fa-solid fa-magnifying-glass `} ></i>
        </div>
    </div>
  )
}

export default SearchBar