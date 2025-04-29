import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./SearchBar.module.css"

const SearchBar = () => {
  const [terminoBuqueda,setTerminoBuqueda]=useState("")
  // const navigate=useNavigate()
  const handleChange=(e)=>{
    setTerminoBuqueda(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {

      console.log("test")
    }
  };
  return (
    <div  className={`${styles.searchbar_container} d-flex justify-content-center align-items-center flex-row`}> 
        <input 
        className={`${styles.searchbar_input}`}
        value={terminoBuqueda}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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