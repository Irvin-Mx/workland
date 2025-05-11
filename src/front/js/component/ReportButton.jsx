import React,{useState} from 'react'

const ReportButton = ({report,setModalOpen}) => {
  if(report){
    return(
      <button className='btn btn-danger'>Ya hay un reporte hecho</button>
    )
  }

  return (
    <button 
    onClick={()=>setModalOpen(true)}
    className='btn btn-danger'>Reportar</button>
  )
}

export default ReportButton