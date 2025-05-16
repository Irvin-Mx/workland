import React, { useContext, useState, useEffect } from "react"
import CommentCard from '../component/CommentCard.jsx'
import { Context } from "../store/appContext.js";
import ContenidoVacioPlaceholder from "../component/ContenidoVacioPlaceholder.jsx";

const CommentsMade = ({ deleteButton }) => {
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

        return (<div className='w-100 bg-white d-flex justify-content-start align-items-center flex-column gap-2'>

            <div className="jumbotron w-100 m-0 jumbotron-fluid" style={{ background:"aliceblue",padding: "1rem" }}>
                <div className="row aling-items-center">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img
                            src="https://res.cloudinary.com/djmmbd8xd/image/upload/v1747333730/coment_obmklo.png"
                            alt="comentarios"
                            className="img-fluid rounded-start"
                            style={{  width: '250px' }}
                        />
                    </div>
                    <div className="col-md-8 align-items-center">

                        <p className="h4"> ¡Gracias por compartir tus comentarios!</p> 
                        <p className="lead">Tu opinión es fundamental para nosotros y nos impulsa a seguir mejorando día a día. Apreciamos sinceramente que te tomes el tiempo para brindarnos tu retroalimentación.</p>
                    </div>
                    
                </div>
            </div>
        
            <div className="w-100 row">
                {
                    data?.length !== 0 ?
                        data?.map(({ author_full_name, id, stars, author_img_url, text }) => <CommentCard key={id} text={text} userName={author_full_name} img_url={author_img_url} stars={stars} deleteButton id={id} setData={setData} />)
                        :
                        <ContenidoVacioPlaceholder mensaje={"No has creado comentarios."} />
                }

            </div>


        </div>)

    } else {
        return (
            <div className='w-100 bg-white d-flex justify-content-start align-items-center  flex-column gap-2'>
                <h1 className=" w-100">
                    ¡Comparte tus comentarios!
                </h1>
                <ContenidoVacioPlaceholder mensaje={"No has creado comentarios."} />

            </div>
        )

    }
}

export default CommentsMade

