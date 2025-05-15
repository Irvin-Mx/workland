import React, { useEffect, useContext, useState } from 'react'
import ContenidoVacioPlaceholder from '../component/ContenidoVacioPlaceholder.jsx'

import { Context } from "../store/appContext"
// id

// img_url

// last_name

// name


const FavoriteItem = ({ id, img_url, last_name, name, handleFavorite }) => {
    console.log(id)
    return (
        <div

            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            className='w-100  d-flex align-items-center flex-row p-2 rounded'>
            <div className='w-75 d-flex align-items-center gap-2 flex-row'>
                <img src={img_url} alt="img p" style={{ height: "50px", width: "50px" }} className='rounded-circle' />
                <h3>
                    {`${name} ${last_name}`}
                </h3>

            </div>


            <button onClick={() => handleFavorite(id)} className="btn w-25 btn-danger gap-2 text-nowrap d-flex align-items-center justify-content-center flex-row">
                <i className="fa-regular fa-heart"></i>
                <p className='p-0 m-0' > Eliminar.</p>
                {/* <i id={item.id} className="fa-regular fa-heart"></i>
                                            <span id={item.id}> No esta en favoritos</span> */}
            </button>

        </div>
    )
}

const Favorites = () => {
    const { store, actions } = useContext(Context)
    const [usersFavoritesArray, setUsersFavoritesArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let [isInFavorites, setIsInFavorites] = useState(false)

    useEffect(() => {
        console.log("Will try to get all favorites")

        actions.getAllFavorites()
            .then((res) => {
                console.log(res)
                setUsersFavoritesArray(res.result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])


    const handleFavorite = (id) => {


        actions.addOrRemoveFavorite({
            favorite_id: id,
            favorite_status: true
        }).then((res) => {
            actions.getAllFavorites()
                .then((res) => setUsersFavoritesArray(res.result))
        }).catch((e) => { console.log("error", e) })

    }




    if (isLoading) {
        return (
            <div>
                
                    <div className="jumbotron w-100">
                        <div className="row aling-items-center">
                            <div className="col-md-4 d-flex justify-content-center">
                                <div className="col-md-8 align-items-center">
                                    <p className="display-5"> <strong>Mis Favoritos</strong></p>
                                </div>
                                <img
                                    src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747256782/fav_sdchw3.png"
                                    alt="favoritos"
                                    className="img-fluid rounded-start"
                                    style={{ height: "50px" }}
                                />
                            </div>
                        </div>
                    </div>
                    <p>cargando</p>
                
            </div>
        )
    }

    return (
        <div className='w-100'>

            <div className="container-fluid my-0 p-0">
                <div className="jumbotron w-100">
                    <div className="row aling-items-center">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="col-md-8 align-items-center">
                                <p className="display-5"> <strong>Mis Favoritos</strong></p>
                            </div>
                            <img
                                src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747256782/fav_sdchw3.png"
                                alt="favoritos"
                                className="img-fluid rounded-start"
                                style={{ height: "50px" }}
                            />
                        </div>
                    </div>
                </div>
                {usersFavoritesArray.length > 0 ?
                    usersFavoritesArray?.map((item) => {
                        return (
                            <FavoriteItem
                                key={item.id}
                                {...item}
                                handleFavorite={handleFavorite} />)
                    })
                    :
                    <ContenidoVacioPlaceholder mensaje={"No has agregado favoritos."} />}
            </div>
        </div>
    )
}

export default Favorites