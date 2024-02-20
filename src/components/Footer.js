import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/openinghours")
      .then((response) => response.json())
      .then((data) => setOpeningHours(data))
      .catch((error) => console.error("Error fetching opening hours:", error));
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <footer className="footer">
      <h3>Garage V.Parrot</h3>
      <p>Adresse : 15 Rue de la Révolution, 31000 Toulouse, France</p>
      <div>Horaires d'ouverture :</div>
      <table>
        <thead>
          <tr>
            <th>Jour</th>
            <th>Heure d'ouverture</th>
            <th>Heure de fermeture</th>
          </tr>
        </thead>
        <tbody>
          {openingHours.map((hour) => (
            <tr key={hour.ID_Horaire}>
              <td>{hour.Jour}</td>
              <td>{formatTime(hour.Heure_Ouverture)}</td>
              <td>
                {hour.Heure_Fermeture !== "FERME"
                  ? formatTime(hour.Heure_Fermeture)
                  : "Fermé"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Email : contact@garage-v-Parrot-toulouse.fr</p>
      <p>Téléphone : +33 5 62 00 00 00</p>
      <p>
        <a href="/cgu">Conditions Générales d'Utilisation (CGU)</a>
      </p>
      <p>Site Web créé par Evans Ntoutoume. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
