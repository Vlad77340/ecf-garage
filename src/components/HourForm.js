import React, { useState } from "react";

function HourForm({ hour = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    day: hour.day || "",
    opening: hour.opening || "",
    closing: hour.closing || "",
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
        Jour: <input name="day" value={formData.day} onChange={handleChange} />
      </label>
      <label>
        Heure d'ouverture:{" "}
        <input
          type="time"
          name="opening"
          value={formData.opening}
          onChange={handleChange}
        />
      </label>
      <label>
        Heure de fermeture:{" "}
        <input
          type="time"
          name="closing"
          value={formData.closing}
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

export default HourForm;
