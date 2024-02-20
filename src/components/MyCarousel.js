import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyCarousel.css";

function MyCarousel() {
  return (
    <Carousel className="carousel-container">
      <Carousel.Item>
        <img
          className="carousel-img"
          src="https://images.pexels.com/photos/4489775/pexels-photo-4489775.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Première diapositive"
        />
        <Carousel.Caption>
          <h3>Titre de la première diapositive</h3>
          <p>Description de la première diapositive.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="https://images.pexels.com/photos/6039212/pexels-photo-6039212.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Deuxième diapositive"
        />
        <Carousel.Caption>
          <h3>Titre de la deuxième diapositive</h3>
          <p>Description de la deuxième diapositive.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="https://images.pexels.com/photos/4489712/pexels-photo-4489712.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Troisième diapositive"
        />
        <Carousel.Caption>
          <h3>Titre de la troisième diapositive</h3>
          <p>Description de la troisième diapositive.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
