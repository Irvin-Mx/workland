import React from 'react';
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="container py-5 my-5 text-center">
      <h1 className="display-1 fw-bold" style={{color: "#FF6B6B"}}>404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p className="lead mb-4">
        404 - Página ausente. Tal vez se fue a tomar un café.
      </p>
      <Link className='p-2 rounded text-light' to="/" role='button' style={{backgroundColor: "#00D1B2", textDecoration:"none"}}>Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;