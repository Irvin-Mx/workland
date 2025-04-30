import React from "react"

const DetalleDeOrden = () => {


    const handlePago = ()=>{
        alert("Continuaremos con su pago, por favor espere un momento....")
    }

    return (
        <div className="w-75 rounded p-4 border">
                <h1 className="text-danger">Detallado de orden</h1>
                <div className="border-top border-bottom">
                    <h3>Orden: #######</h3>
                    <h4>Cliente: xxxxx xxxxxx</h4>
                    <h4>Freelance: xxxxx xxxxxx</h4>
                    <div className="border-top border-bottom">
                        <p>Producto:</p>
                        <p>Pagina web</p>
                    </div>
                    <div className="border-top border-bottom">
                        <p>Estado: <span className="text-warning">pending</span></p>
                    </div>
                    <div className="d-flex justify-content-end order-top border-bottom p-2">
                        <button onClick={handlePago} className="btn btn-primary">Continuar con el pago</button>
                    </div>
                </div>
            </div>
    )
}

export default DetalleDeOrden