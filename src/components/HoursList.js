import React, { useEffect, useState } from "react";
import HourForm from "./HourForm";

function HoursList() {
  const [hours, setHours] = useState([]);
  const [editingHour, setEditingHour] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/openinghours")
      .then((response) => response.json())
      .then(setHours)
      .catch(console.error);
  }, []);

  const handleEdit = (hour) => setEditingHour(hour);
  const handleDelete = (hourId) => {
    fetch(`http://localhost:5000/api/openinghours/${hourId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setHours(hours.filter((hour) => hour.ID_Horaire !== hourId));
        }
      })
      .catch(console.error);
  };
  const handleAdd = () => setEditingHour({});
  const handleSubmit = (hour) => {};

  return editingHour ? (
    <HourForm
      hour={editingHour}
      onSubmit={handleSubmit}
      onCancel={() => setEditingHour(null)}
    />
  ) : (
    <div>
      <h2>Heures d'Ouverture</h2>
      <button onClick={handleAdd}>Ajouter des heures d'ouverture</button>
      {hours.map((hour) => (
        <div key={hour.ID_Horaire}>
          {hour.Jour}: {hour.Heure_Ouverture} - {hour.Heure_Fermeture}
          <button onClick={() => handleEdit(hour)}>Modifi</button>
          <button onClick={() => handleDelete(hour.ID_Horaire)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default HoursList;
