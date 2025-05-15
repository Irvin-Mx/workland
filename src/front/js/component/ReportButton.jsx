import React,{useState} from 'react'

const ReportButton = ({report,setModalOpen}) => {
  if(report){
    return(
      <button className="btn text-muted">¡Gracias por tu reporte!</button>
    )
  }

  return (
    <button 
    onClick={()=>setModalOpen(true)}
    className="btn fs-6 text-decoration-underline" style={{color:'#1E3E6D', padding:'0'}}>Reportar Perfil</button>
  )
}

export default ReportButton