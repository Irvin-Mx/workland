import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const BotonRetroseso = () => {
    const navigate = useNavigate();
    const botonRetrosesoStyles={
        cursor:"pointer",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        backgroundColor:"#CCD6F6",
        borderRadius:" 0 10px 10px 0",
        width:"70px",
        height:"50px",
        position:"fixed",
        top:"20%",
        left:0
    }
  return (
    <div
    onClick={()=>navigate(-1)}
    className=' d-flex align-items-center justify-content-center'
    style={botonRetrosesoStyles}
    >
        <IoIosArrowBack style={{fontSize:"40px"}} />
    </div>
  )
}

export default BotonRetroseso