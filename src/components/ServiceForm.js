import React, { useState } from "react";

function ServiceForm({ service = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    description: service.description || "",
    prix: service.prix || "",
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
        Description:{" "}
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Prix:{" "}
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Sauvegarder</button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
}

export default ServiceForm;
