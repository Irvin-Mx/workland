import React, { useContext, useState, useEffect } from "react"
import CommentCard from '../component/CommentCard.jsx'
import { Context } from "../store/appContext.js";
import ContenidoVacioPlaceholder from "../component/ContenidoVacioPlaceholder.jsx";

const CommentsMade = ({deleteButton}) => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        actions.getAllCommentsMade()
            .then((res) => {
                setData(res.result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


    if (isLoading == false) {

        return (<div className='w-100 bg-white d-flex justify-content-start align-items-center  flex-column gap-2'>
            <h1 className=" w-100 ">
                Comentarios.
            </h1>
            <div className="w-100 row">
                            {
                data?.length !== 0 ?
                    data?.map(({ author_full_name, id, stars, author_img_url, text }) => <CommentCard key={id} text={text} userName={author_full_name} img_url={author_img_url} stars={stars} deleteButton  id={id} setData={setData}/>)
                    :
                    <ContenidoVacioPlaceholder mensaje={"No has creado comentarios."}/>
            }

            </div>


        </div>)

    } else {
        return (
            <div className='w-100 bg-white d-flex justify-content-start align-items-center  flex-column gap-2'>
                <h1 className=" w-100">
                    Comentarios.
                </h1>
                <ContenidoVacioPlaceholder mensaje={"No has creado comentarios."}/>

            </div>
        )

    }
}

export default CommentsMade