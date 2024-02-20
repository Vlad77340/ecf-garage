import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenue au Garage V. Parrot</h1>
      <p>
        Le Garage V. Parrot, fondé en 2021 à Toulouse par Vincent Parrot, un
        expert avec 15 ans d'expérience en réparation automobile, offre une
        expertise complète en réparation de carrosserie, mécanique et entretien
        régulier. Ce garage de confiance propose également des véhicules
        d'occasion.
      </p>
      <div className="home-sections">
        <img
          src="https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Garage V.Parrot"
          className="home-image"
        />
        <p>
          Le Garage V. Parrot est un garage familial qui a pour objectif de
          satisfaire ses clients. Nous nous engageons à vous fournir un service
          rapide et de qualité. Nous vous proposons des services de réparation,
          de vente et d'entretien pour tous types de véhicules. Nous sommes
          spécialisés dans les réparations de carrosserie et de mécanique. Nous
          sommes également spécialisés dans les réparations de voitures de sport
          et de luxe.
        </p>
      </div>
    </div>
  );
};

export default Home;
