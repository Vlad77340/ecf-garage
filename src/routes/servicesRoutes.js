const express = require("express");
const router = express.Router();
const pool = require("../database.js");

router.post("/", (req, res) => {
  const { nom, description, prix } = req.body;
  if (!nom || !description || prix === undefined) {
    return res
      .status(400)
      .send("Les champs nom, description et prix sont requis.");
  }
  const query =
    "INSERT INTO Services (nom, description, prix) VALUES (?, ?, ?)";
  pool.query(query, [nom, description, prix], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Erreur lors de l'ajout d'un service.");
    }
    res.status(201).send(`Service créé avec l'ID: ${results.insertId}`);
  });
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM Services";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération des services.");
    }
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Services WHERE id = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Erreur lors de la récupération du service.");
    }
    if (results.length === 0) {
      return res.status(404).send("Service non trouvé.");
    }
    res.status(200).json(results[0]);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nom, description, prix } = req.body;
  if (!nom || !description || prix === undefined) {
    return res
      .status(400)
      .send(
        "Les champs nom, description et prix sont requis pour la mise à jour."
      );
  }
  const query =
    "UPDATE Services SET nom = ?, description = ?, prix = ? WHERE id = ?";
  pool.query(query, [nom, description, prix, id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Erreur lors de la mise à jour du service.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Service non trouvé pour la mise à jour.");
    }
    res.send("Service mis à jour avec succès.");
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Services WHERE id = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Erreur lors de la suppression du service.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Service non trouvé pour la suppression.");
    }
    res.send("Service supprimé avec succès.");
  });
});

module.exports = router;
