import React from "react"
import CommentCard from '../component/CommentCard.jsx'

const CommentSection=({list=[]})=>{
    if(list.length==0){
        return(
            <div className='my-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
                <h5>No hay comentarios</h5>
    
            </div>
        )
    }
    return(
        <div className='my-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
        <h4>
            Comentarios.
        </h4>
        {
          list.map(({userName,id,stars,img_url})=><CommentCard key={id} userName={userName} img_url={img_url} stars={stars}/>)
        }

        </div>
    )
}

export default CommentSection