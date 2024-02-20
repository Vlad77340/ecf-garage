import React, { useEffect, useState } from "react";
import CarForm from "./CarForm";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/usedcars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch(console.error);
  }, []);

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleDelete = (carId) => {
    fetch(`http://localhost:5000/api/usedcars/${carId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCars(cars.filter((car) => car.ID_Vehicule !== carId));
        }
      })
      .catch(console.error);
  };

  const handleAdd = () => {
    setEditingCar({});
  };

  const handleSubmit = (car) => {
    const method = car.ID_Vehicule ? "PUT" : "POST";
    const url = car.ID_Vehicule
      ? `http://localhost:5000/api/usedcars/${car.ID_Vehicule}`
      : "http://localhost:5000/api/usedcars";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then(() => {
        fetch("http://localhost:5000/api/usedcars")
          .then((response) => response.json())
          .then((data) => setCars(data))
          .catch(console.error);
        setEditingCar(null);
      })
      .catch(console.error);
  };

  return editingCar ? (
    <CarForm
      car={editingCar}
      onSubmit={handleSubmit}
      onCancel={() => setEditingCar(null)}
    />
  ) : (
    <div>
      <h2>List of Cars</h2>
      <button onClick={handleAdd}>Add a Car</button>
      {cars.map((car) => (
        <div key={car.ID_Vehicule}>
          <img
            src={car.Image}
            alt={`${car.Marque} ${car.Modele}`}
            style={{ width: "100px", height: "auto" }}
          />
          {car.Marque} - {car.Modele} - €{car.Prix} - {car.Annee} -{" "}
          {car.Kilometre}km - {car.Disponibilite}
          <button onClick={() => handleEdit(car)}>Edit</button>
          <button onClick={() => handleDelete(car.ID_Vehicule)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CarsList;
