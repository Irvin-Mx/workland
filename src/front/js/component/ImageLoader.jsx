import React, { useState, useEffect } from 'react';

// Hook personalizado para manejar la carga de imágenes
const useImageLoader = (src) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
      setError(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoading, error };
};

// Componente principal
const ImageLoader = ({ 
  src = 'https://via.placeholder.com/400x300',
  alt = 'Imagen por defecto',
  width = '100%',
  height = 'auto'
}) => {
  const { isLoading, error } = useImageLoader(src);

  if (error) {
    return (
      <div className="error-container">
        <p>Error al cargar la imagen</p>
      </div>
    );
  }

  return (
    <div className="image-container" style={{ width, height }}>
      {isLoading && (
        <div className="loading-placeholder">
          Cargando...
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`image-element ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ width, height }}
      />
    </div>
  );
};

export default ImageLoader;