import React, { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import FreelanceCard from "./FreelanceCard.jsx";
import { useNavigate } from 'react-router-dom';

const CarruselFreelancers = ({ freelancers }) => {
  const navigate = useNavigate();

  // if (!Array.isArray(freelancers) || freelancers.length === 0) {
  //   return <p>No hay freelancers disponibles</p>;
  // }

  const groupedSlides = useMemo(() => {
    return Array.from({ length: Math.ceil(freelancers.length / 2) }, (_, i) => 
      freelancers.slice(i * 2, (i + 1) * 2)
    );
  }, [freelancers]);
  consoole.log(groupedSlides)

  return (
    <Carousel interval={null}>
      {[1,2,3,4].map((group, index) => (
        <Carousel.Item key={index}>
          <div className="container py-4 bg-primary">
            <div className="row justify-content-center">
              <h3>First slide label {index}</h3>
              {/* {group.map((freelancer) => (
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
              ))} */}
            </div>
          </div>
        </Carousel.Item>

        
      ))}

        {/* <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default CarruselFreelancers;