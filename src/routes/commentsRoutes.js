const express = require("express");
const router = express.Router();
const pool = require("../database.js");

router.post("/", (req, res) => {
  const { ID_User, Texte, Date, Approuve } = req.body;
  if (!ID_User || !Texte || !Date) {
    return res
      .status(400)
      .send("Les champs ID_User, Texte, et Date sont requis.");
  }
  const query =
    "INSERT INTO Commentaires (ID_User, Texte, Date, Approuve) VALUES (?, ?, ?, ?)";
  pool.query(
    query,
    [ID_User, Texte, Date, Approuve || false],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout d'un commentaire.");
      }
      res.status(201).send(`Commentaire ajouté avec l'ID: ${results.insertId}`);
    }
  );
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM Commentaires";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération des commentaires.");
    }
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Commentaires WHERE ID_Commentaire = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la récupération du commentaire.");
    }
    if (results.length === 0) {
      return res.status(404).send("Commentaire non trouvé.");
    }
    res.status(200).json(results[0]);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Texte, Approuve } = req.body;
  if (!Texte) {
    return res
      .status(400)
      .send("Le champ Texte est requis pour la mise à jour.");
  }
  const query =
    "UPDATE Commentaires SET Texte = ?, Approuve = ? WHERE ID_Commentaire = ?";
  pool.query(query, [Texte, Approuve, id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la mise à jour du commentaire.");
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour la mise à jour.");
    }
    res.send("Commentaire mis à jour avec succès.");
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Commentaires WHERE ID_Commentaire = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("Erreur lors de la suppression du commentaire.");
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour la suppression.");
    }
    res.send("Commentaire supprimé avec succès.");
  });
});

module.exports = router;
