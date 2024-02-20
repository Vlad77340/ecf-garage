import React, { useState } from "react";

function CarForm({ car = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    image: car.image || "",
    marque: car.marque || "",
    modele: car.modele || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Marque:{" "}
        <input name="marque" value={formData.marque} onChange={handleChange} />
      </label>
      <label>
        Modèle:{" "}
        <input name="modele" value={formData.modele} onChange={handleChange} />
      </label>
      <button type="submit">Sauvegarder</button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
}

export default CarForm;
