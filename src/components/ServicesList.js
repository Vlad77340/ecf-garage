import React, { useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";

function ServicesList() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  function fetchServices() {
    fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then(setServices)
      .catch(console.error);
  }

  function handleDelete(serviceId) {
    fetch(`http://localhost:5000/api/services/${serviceId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchServices();
        }
      })
      .catch(console.error);
  }

  function handleEdit(service) {
    setEditingService(service);
  }

  function handleAdd() {
    setEditingService({});
  }

  function handleSubmit(service) {
    const method = service.ID_Service ? "PUT" : "POST";
    const endpoint = service.ID_Service
      ? `http://localhost:5000/api/services/${service.ID_Service}`
      : `http://localhost:5000/api/services`;

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then(() => {
        fetchServices();
        setEditingService(null);
      })
      .catch(console.error);
  }

  return editingService ? (
    <ServiceForm
      service={editingService}
      onSubmit={handleSubmit}
      onCancel={() => setEditingService(null)}
    />
  ) : (
    <div>
      <h2>Liste des Services</h2>
      <button onClick={handleAdd}>Ajouter un service</button>
      {services.map((service) => (
        <div key={service.ID_Service}>
          {service.Description} - {service.Prix}€ - Durée estimée:{" "}
          {service.DureeEstimee} Heures
          <button onClick={() => handleEdit(service)}>Modifi</button>
          <button onClick={() => handleDelete(service.ID_Service)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default ServicesList;
