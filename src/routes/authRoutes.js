// routes/authRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../database"); // Assurez-vous que le chemin est correct
require("dotenv").config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM Utilisateurs WHERE Email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la recherche de l'utilisateur:", error);
        return res.status(500).send("Erreur lors de la connexion");
      }

      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(password, user.MotDePasse, (err, isMatch) => {
          if (err) {
            console.error(
              "Erreur lors de la comparaison des mots de passe:",
              err
            );
            return res.status(500).send("Erreur lors de la connexion");
          }

          if (isMatch) {
            const secretKey = process.env.JWT_SECRET || "votreCleSecrete";
            const token = jwt.sign(
              { userId: user.Id, email: user.Email }, //
              secretKey,
              { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Connexion réussie !", token });
          } else {
            res
              .status(401)
              .json({ message: "Email ou mot de passe incorrect." });
          }
        });
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé." });
      }
    }
  );
});

module.exports = router;
