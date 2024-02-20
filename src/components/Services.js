import React, { useState, useEffect } from "react";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const formatPrix = (prix) => {
    return `${parseFloat(prix).toFixed(2)} €`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Services</h2>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Description</th>
            <th>Prix</th>
            <th>Durée Estimée</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.ID_Service}>
              <td>{service.Description}</td>
              <td>{formatPrix(service.Prix)}</td>
              <td>{formatTime(service.DureeEstimee)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;
