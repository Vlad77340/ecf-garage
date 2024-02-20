const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const connection = require("../database");
router.post("/", async (req, res) => {
  const { Nom, Prenom, Email, MotDePasse, Role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(MotDePasse, saltRounds);
    const sql =
      "INSERT INTO Utilisateurs (Nom, Prenom, Email, MotDePasse, Role) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [Nom, Prenom, Email, hashedPassword, Role],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'ajout de l'utilisateur:", err);
          return res
            .status(500)
            .send("Erreur lors de l'ajout de l'utilisateur");
        }
        res.status(201).send("Utilisateur ajouté avec succès");
      }
    );
  } catch (error) {
    console.error("Erreur lors du hashage du mot de passe:", error);
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Utilisateurs";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des utilisateurs");
    }
    res.status(200).json(results);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Nom, Prenom, Email, MotDePasse, Role } = req.body;
  const sql =
    "UPDATE Utilisateurs SET Nom = ?, Prenom = ?, Email = ?, MotDePasse = ?, Role = ? WHERE ID_User = ?";
  connection.query(
    sql,
    [Nom, Prenom, Email, MotDePasse, Role, id],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la modification de l'utilisateur:", err);
        return res
          .status(500)
          .send("Erreur lors de la modification de l'utilisateur");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Utilisateur non trouvé");
      }
      res.send("Utilisateur modifié avec succès");
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Utilisateurs WHERE ID_User = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      return res
        .status(500)
        .send("Erreur lors de la suppression de l'utilisateur");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.send("Utilisateur supprimé avec succès");
  });
});

module.exports = router;
