import React, { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import FreelanceCard from "./FreelanceCard.jsx";
import { useNavigate } from 'react-router-dom';

const CarruselFreelancers = ({ freelancers }) => {
  const navigate = useNavigate();

  if (!Array.isArray(freelancers) || freelancers.length === 0) {
    return <p>No hay freelancers disponibles</p>;
  }

  const groupedSlides = useMemo(() => {
    return Array.from({ length: Math.ceil(freelancers.length / 2) }, (_, i) => 
      freelancers.slice(i * 2, (i + 1) * 2)
    );
  }, [freelancers]);

  return (
    <Carousel interval={null}>
      {groupedSlides.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="container py-4">
            <div className="row justify-content-center">
              {group.map((freelancer) => (
                <div 
                  key={freelancer.id}
                  className="col-md-6 d-flex justify-content-center"
                >
                  <FreelanceCard
                    id={freelancer.id}
                    title={freelancer.title}
                    user_name={freelancer.user_name}
                  />
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselFreelancers;