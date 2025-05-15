import React from 'react';
import { Link } from 'react-router-dom';

const TeamSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Conoce al equipo</h2>

        <div className="row g-4">

          {/* Fredy */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 text-center p-4">
              <h5 className="card-title mb-3">Fredy</h5>
              <p className="text-muted">Desarrollador Full Stack</p>
              <Link to="https://linkedin.com/in/irvin " target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm mt-auto">
                <i className="fab fa-linkedin me-1"></i> LinkedIn
              </Link>
            </div>
          </div>

          {/* Sebastián */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 text-center p-4">
              <h5 className="card-title mb-3">Sebastián</h5>
              <p className="text-muted">Full Stack Developer</p>
              <Link to="https://linkedin.com/in/fredy " target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm mt-auto">
                <i className="fab fa-linkedin me-1"></i> LinkedIn
              </Link>
            </div>
          </div>

          {/* Irvin */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 text-center p-4">
              <h5 className="card-title mb-3">Irvin</h5>
              <p className="text-muted">Full Stack Developer</p>
              <Link to="https://linkedin.com/in/sebastian " target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm mt-auto">
                <i className="fab fa-linkedin me-1"></i> LinkedIn
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;