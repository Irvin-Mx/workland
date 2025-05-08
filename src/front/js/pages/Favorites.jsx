import React, { useEffect, useContext,useState } from 'react'

import {Context} from "../store/appContext"

const Favorites = () => {

    const {store,actions} = useContext(Context)
    const [usersFavoritesArray,setUsersFavoritesArray] = useState([])


    useEffect(async () => {
    console.log("Will try to get all favorites")
    
    const favoritesArray = await actions.getAllFavorites()

    console.log(favoritesArray)

    setUsersFavoritesArray(favoritesArray.result)


    

}, [])
    return (
        <div>
            <div>
                <h1>favoritos aqui</h1>
                {usersFavoritesArray.length > 0? usersFavoritesArray.map((item)=> {
                    return (
                        <div key={item.id}>

                        <p>{item.name}</p>
                        <button className="btn btn-primary">Remover de favoritos</button>
                        </div>
                    )
                }):null}
            </div>
        </div>
    )
}

export default Favorites