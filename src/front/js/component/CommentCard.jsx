import React, { useContext, useEffect, useState } from 'react'


const StarComponentShell = ({ value }) => {
    if (value) {
        return (
            <div
                className='d-flex justify-content-start align-content-center '>
                <i style={{ fontSize: "25px", color: "yellow" }} className="fa-solid fa-star m-1"></i>
            </div>
        )
    }
    return (
        <div
            className='d-flex justify-content-start align-content-center '>
            <i style={{ fontSize: "25px", color: "black" }} className="fa-solid fa-star m-1"></i>
        </div>
    )
}

const CommentCard = ({ userName, stars }) => {
    const miArray2 = Array(5).fill(0);
    const resultado = miArray2.map((_, index) =>
        index < stars ? 1 : 0
    );

    return (
        <div className="card container-fluid" >
            <div className="card-body">
                <div className='d-flex justify-content-start align-content-center flex-row'>
                    <div className="rounded-circle" style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                        {/* <img
                            className="rounded-circle"
                            src={store.userProfile.img_url} alt="imagen perfil" style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} /> */}
                    </div>

                    <h4 className='m-0 p-0 d-flex justify-content-start align-items-center'>
                        {`${userName}  `}
                    </h4>
                </div>
                <hr />
                <div>
                    <div className='d-flex justify-content-start align-content-center flex-row mb-2'>
                        {
                            resultado.map((elem, index) => <StarComponentShell key={index} value={elem} />)
                        }
                    </div>
                    <p style={{fontSize:"1.5rem"}} className="w-full ">
                        ssssssssssssssssss
                    </p>

                </div>
            </div>
        </div>
    )
}

export default CommentCard