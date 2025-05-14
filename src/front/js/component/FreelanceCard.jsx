import React from 'react'
import { useNavigate } from 'react-router-dom'

const FreelanceCard = ({user_name,title,id,cover_img_url}) => {
    const navigate=useNavigate()

    return (
        <div className="card m-2" style={{width: "18rem"}}>
            
            <div className="card-img-top" style={{height:"9rem"}}>
                <img src={cover_img_url} className='h-100 w-100 object-fit-scale'  alt="alt image"/>
            </div>
                <div className="card-body">
                    <h5>{user_name}</h5>
                    <p className="card-text">
                        {
                            title
                        }
                    </p>
                    <button className='btn btn-primary' onClick={()=>navigate(`/freelancePerfil/${id}`)}>
                        Detalles del Freelance

                    </button>
                    

                </div>
        </div>
    )
}

export default FreelanceCard