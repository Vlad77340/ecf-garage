import React, { useState, useEffect } from "react";
import "./Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [kilometreRange, setKilometreRange] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/usedcars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const filterCarsByKilometreRange = () => {
    const filtered = cars.filter((car) => {
      switch (kilometreRange) {
        case "0-30000":
          return car.Kilometre <= 30000;
        case "30001-60000":
          return car.Kilometre > 30000 && car.Kilometre <= 60000;
        case "60001-100000":
          return car.Kilometre > 60000 && car.Kilometre <= 100000;
        case "100000+":
          return car.Kilometre > 100000;
        default:
          return true;
      }
    });
    setFilteredCars(filtered);
  };

  return (
    <div>
      <h1>Véhicules d'Occasion</h1>

      <select
        value={kilometreRange}
        onChange={(e) => setKilometreRange(e.target.value)}
      >
        <option value="all">Tous les kilométrages</option>
        <option value="0-30000">0 - 30,000 Km</option>
        <option value="30001-60000">30,001 - 60,000 Km</option>
        <option value="60001-100000">60,001 - 100,000 Km</option>
        <option value="100000+">100,000 Km +</option>
      </select>
      <button onClick={filterCarsByKilometreRange}>Filtrer</button>

      <ul className="cards">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <li className="carli" key={car.ID_Vehicule}>
              <img
                src={car.Image}
                alt={`${car.Marque} ${car.Modele}`}
                style={{ width: "250px", height: "200px" }}
              />
              <div>Marque: {car.Marque}</div>
              <div>Modèle: {car.Modele}</div>
              <div>Année: {car.Annee}</div>
              <div>Kilométres: {`${car.Kilometre} Km`}</div>
              <div>Prix: €{car.Prix}</div>
              <div>Disponibilité: {car.Disponibilite}</div>
            </li>
          ))
        ) : (
          <div>Aucune voiture disponible.</div>
        )}
      </ul>
    </div>
  );
};

export default Cars;
