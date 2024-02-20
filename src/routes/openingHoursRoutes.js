const express = require("express");
const router = express.Router();

const pool = require("../database");

router.post("/", (req, res) => {
  const { jour, heureOuverture, heureFermeture } = req.body;

  if (!jour || !heureOuverture || !heureFermeture) {
    return res.status(400).send("Tous les champs sont requis.");
  }
  const query =
    "INSERT INTO HorairesOuverture (Jour, Heure_Ouverture, Heure_Fermeture) VALUES (?, ?, ?)";
  pool.query(
    query,
    [jour, heureOuverture, heureFermeture],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send("Erreur lors de l'ajout de l'horaire d'ouverture.");
      }
      res
        .status(201)
        .send(`Horaire d'ouverture créé avec l'ID: ${results.insertId}`);
    }
  );
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM HorairesOuverture";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération des horaires.");
    }
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM HorairesOuverture WHERE ID_Horaire = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération de l'horaire d'ouverture.");
    }
    if (results.length === 0) {
      return res.status(404).send("Horaire d'ouverture non trouvé.");
    }
    res.status(200).json(results[0]);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { jour, heureOuverture, heureFermeture } = req.body;

  if (!jour || !heureOuverture || !heureFermeture) {
    return res.status(400).send("Tous les champs sont requis.");
  }
  const query =
    "UPDATE HorairesOuverture SET Jour = ?, Heure_Ouverture = ?, Heure_Fermeture = ? WHERE ID_Horaire = ?";
  pool.query(
    query,
    [jour, heureOuverture, heureFermeture, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send("Erreur lors de la mise à jour de l'horaire d'ouverture.");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Horaire d'ouverture non trouvé.");
      }
      res.send("Horaire d'ouverture mis à jour avec succès.");
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM HorairesOuverture WHERE ID_Horaire = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la suppression de l'horaire d'ouverture.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Horaire d'ouverture non trouvé.");
    }
    res.send("Horaire d'ouverture supprimé avec succès.");
  });
});

module.exports = router;
