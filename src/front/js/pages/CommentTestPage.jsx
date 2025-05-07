import React from 'react'
import CommentBox from '../component/CommentBox.jsx'
import CommentCard from '../component/CommentCard.jsx'

const testComm=[
  {
    id:1,
    userName:"Profile 1",
    stars:5
  },
  {
    id:2,
    userName:"Profile 2",
    stars:3
  },
  {
    id:3,
    userName:"Profile 3",
    stars:2
  },
]


const CommentTestPage = () => {
  return (
    <div style={{minHeight:"100vh",height:"auto"}} className='d-flex justify-content-center align-items-center container-fluid flex-column bg-black px-5'>
        <h1>CommentTestPage</h1>
        <CommentBox/>
        <hr/>
        <div className='d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
        {
          testComm.map(({userName,id,stars})=><CommentCard key={id} userName={userName} stars={stars}/>)
        }

        </div>
 
        
        </div>
  )
}

export default CommentTestPage