const express = require("express");
const router = express.Router();
const pool = require("../database.js");

router.post("/", (req, res) => {
  const { image, marque, modele, annee, prix } = req.body;
  if (!image || !marque || !modele || !annee || prix === undefined) {
    return res
      .status(400)
      .send("Les champs marque, modele, annee et prix sont requis.");
  }
  const query =
    "INSERT INTO Vehicules (Image, Marque, Modele, Annee, Prix, Type, Disponibilite) VALUES (?, ?, ?, ?, ? 'Occasion', 'Disponible')";
  pool.query(query, [image, marque, modele, annee, prix], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de l'ajout du véhicule d'occasion.");
    }
    res
      .status(201)
      .send(`Véhicule d'occasion ajouté avec l'ID: ${results.insertId}`);
  });
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM Vehicules WHERE Type = 'Occasion'";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération des véhicules d'occasion.");
    }
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM Vehicules WHERE ID_Vehicule = ? AND Type = 'Occasion'";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération du véhicule d'occasion.");
    }
    if (results.length === 0) {
      return res.status(404).send("Véhicule d'occasion non trouvé.");
    }
    res.status(200).json(results[0]);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { image, marque, modele, annee, prix } = req.body;
  if (!image || !marque || !modele || !annee || prix === undefined) {
    return res
      .status(400)
      .send(
        "Les champs image, marque, modele, annee et prix sont requis pour la mise à jour."
      );
  }
  const query =
    "UPDATE Vehicules SET Image = ?, Marque = ?, Modele = ?, Annee = ?, Prix = ? WHERE ID_Vehicule = ? AND Type = 'Occasion'";
  pool.query(
    query,
    [image, marque, modele, annee, prix, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send("Erreur lors de la mise à jour du véhicule d'occasion.");
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .send("Véhicule d'occasion non trouvé pour la mise à jour.");
      }
      res.send("Véhicule d'occasion mis à jour avec succès.");
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "DELETE FROM Vehicules WHERE ID_Vehicule = ? AND Type = 'Occasion'";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la suppression du véhicule d'occasion.");
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .send("Véhicule d'occasion non trouvé pour la suppression.");
    }
    res.send("Véhicule d'occasion supprimé avec succès.");
  });
});

module.exports = router;
