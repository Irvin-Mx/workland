import React,{useEffect,useContext,useState} from 'react'
import CommentBox from '../component/CommentBox.jsx'
import CommentSection from '../component/CommentSection.jsx'
import CommentsMade from './CommentsMade.jsx'

const CommentTestPage = () => {
  return (
    <div style={{minHeight:"100vh",height:"auto"}} className='d-flex justify-content-center align-items-center container-fluid flex-column bg-black px-5'>
        <h1>CommentTestPage</h1>
        <CommentBox freelance_id={2}/>
        <hr/>
        {/* <CommentSection freelance_id={2}/> */}
        <CommentsMade user_id={1}/>
        </div>
  )
}

export default CommentTestPage