import React from 'react'
import { Outlet } from 'react-router-dom'
const AdminPage = () => {
    return (
        <div style={{height:"100vh"}} className='container-fluid  d-flex align-items-center justify-content-start flex-row p-0'>
            <div className=' h-100' style={{ width: "300px" }}>
                sidebar
            </div>
            <div className='h-100 container-fluid' style={{width:"100%"}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage