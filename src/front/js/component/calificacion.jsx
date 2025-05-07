import React from "react";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Calificacion = (props)=>{

return(
    <div>
        Calificacion:
      {
        [...new Array(5)].map ((star, index)=>{
            return index> props.score ? <CiStar /> : <FaStar />
        })
        
       
      }  
    </div>
);

};
export default Calificacion;