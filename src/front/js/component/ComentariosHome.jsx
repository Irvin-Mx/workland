import Carousel from "react-bootstrap/Carousel";
import React from "react"
import styles from "../pages/home.module.css"


const resArray = [
    [
        {
            id: 1,
            nombre: "Carlos",
            resena: "Excelente servicio de desarrollo web. La comunicación fue fluida y el resultado superó mis expectativas. Sin duda, recomendaría a este freelancer a otros.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178602/31_cuf9tr.jpg"
        },
        {
            id: 2,
            nombre: "Lucia",
            resena: "Trabajo con Juan en varios proyectos y siempre ha cumplido con los plazos y la calidad. Recomiendo su servicio para cualquier tarea de diseño gráfico.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178560/91_t9syjz.jpg"

        },
        {
            id: 3,
            nombre: "Julio",
            resena: "Marta es una profesional increíble. Su habilidad para resolver problemas y su disposición para ayudar a los clientes son inigualables.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747177848/2_tzud1m.jpg"
        },
    ],
    [
        {
            id: 4,
            nombre: "Ana",
            resena: "El trabajo de diseño UI/UX fue excepcional. La entrega fue antes del plazo estimado y todas las iteraciones fueron muy profesionales.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178106/7_aizajq.jpg"
        },
        {
            id: 5,
            nombre: "Pedro",
            resena: "La calidad del código fue impecable y el seguimiento del proyecto fue constante. Muy recomendado para desarrollo backend.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178148/7_1_jmmftz.jpg"
        },
        {
            id: 6,
            nombre: "María",
            resena: "El manejo de SEO y marketing digital fue muy efectivo. Los resultados en el posicionamiento web fueron sorprendentes.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178303/66_yqujft.jpg"
        }
    ],
    [
        {
            id: 7,
            nombre: "Sofía",
            resena: "La gestión de redes sociales mejoró significativamente nuestra presencia online. El contenido era creativo y relevante.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178200/56_uhvmuq.jpg"
        },
        {
            id: 8,
            nombre: "Gabriel",
            resena: "El desarrollo móvil fue perfecto, cumple con todos los requisitos técnicos y la interfaz es intuitiva.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178525/33_qmr4di.jpg"
        },
        {
            id: 9,
            nombre: "Valeria",
            resena: "La optimización de base de datos mejoró considerablemente el rendimiento de nuestra aplicación.",
            img_url:"https://res.cloudinary.com/dph121s7p/image/upload/v1747178449/99_l2cwlk.jpg"
        }
    ],
]

const ComentarioHomeCard = ({ info }) => {
    return (
        <div style={{height:"18rem"}} className="col-4 d-flex align-items-center justify-content-center flex-column ">
            <div style={{height:"10rem"}}  className="d-flex align-items-center w-100">
                <div className="card-body d-flex d-flex align-items-center justify-content-center flex-column p-4">
                    <img src={info.img_url} className="rounded-circle" alt="img_profile" style={{height:"50px",width:"50px"}} />
                    <h5 className="card-title justify-content-start fs-3">{info.nombre}</h5>
                    <p className="card-text">{info.resena} </p>
                    {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center  p-4">
                {/* <img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." /> */}
                <div className=" d-flex justify-content-between w-50">
                    <div>
                        <i className={`fa-solid fa-star  ${styles.staricons}`}></i>
                    </div>
                    <div>
                        <i className={`fa-solid fa-star  ${styles.staricons}`}></i>
                    </div>
                    <div>
                        <i className={`fa-solid fa-star  ${styles.staricons}`}></i>
                    </div>
                    <div>
                        <i className={`fa-solid fa-star  ${styles.staricons}`}></i>
                    </div>
                    <div>
                        <i className={`fa-solid fa-star  ${styles.staricons}`} ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComentariosHome = () => {
    return (
        <Carousel className=" py-2 px-1">
            {
                resArray.map((elem, index) =>
                    <Carousel.Item key={index} style={{ height: "auto" }}>
                        <div className="d-flex align-items-center justify-content-center flex-row">
                            {
                                elem.map((elem) => <ComentarioHomeCard key={elem.id} info={elem} />)
                            }

                        </div>
                    </Carousel.Item>

                )
            }

        </Carousel>
    );

}

export default ComentariosHome


