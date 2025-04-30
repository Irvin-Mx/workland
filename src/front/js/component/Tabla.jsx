import React from 'react'
import styles from "./Tabla.module.css"

const Row = ({ data }) => {

    return (
        <tr>
            {
                Object.entries(data).map(([llave, valor]) => {
                    if(llave=="id"){
                        return(<th scope="row" className={`${styles.tabla_td} `}  key={valor}>{`${valor}`}</th>) 
                    }
                    return(<td  className={`${styles.tabla_td} `}  key={valor}>{`${valor}`}</td>) 
                })
            }
        </tr>
    );
};

const Tabla = ({ lista }) => {
    return (
        <table className='table '>
            <thead style={{backgroundColor:"#1E266D",color:"white"}} >
                <tr >
                    <td  scope="col" className={`${styles.tabla_td} `} >
                        id
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        Nombre de freelance
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                    Nombre de consumidor
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                    precio
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                    status
                    </td>
                </tr>
            </thead>
            <tbody>
                {lista.map((item) => {
                    return <Row key={item.id} data={item} />;
                })}
            </tbody>
        </table>
    )
}

export default Tabla