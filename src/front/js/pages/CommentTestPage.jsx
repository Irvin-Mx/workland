import React from 'react'
import CommentBox from '../component/CommentBox.jsx'
import CommentSection from '../component/CommentSection.jsx'

const testComm=[
  {
    id:1,
    userName:"Profile 1",
    stars:5,
    img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1746635310/95_bgksfc.png"

  },
  {
    id:2,
    userName:"Profile 2",
    stars:3,
      img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1746635310/83_dnafv5.png"
    
  },
  {
    id:3,
    userName:"Profile 3",
    stars:2,
     img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1746635310/11_p6emwl.png"
  },
]


const CommentTestPage = () => {
  return (
    <div style={{minHeight:"100vh",height:"auto"}} className='d-flex justify-content-center align-items-center container-fluid flex-column bg-black px-5'>
        <h1>CommentTestPage</h1>
        <CommentBox/>
        <hr/>
        <CommentSection list={testComm}/>
        </div>
  )
}

export default CommentTestPage