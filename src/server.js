const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("./database");

const usersRoutes = require("./routes/usersRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const openingHoursRoutes = require("./routes/openingHoursRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const usedCarsRoutes = require("./routes/usedCarsRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/openingHours", openingHoursRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/usedcars", usedCarsRoutes);
app.use(express.static("public"));
app.set("trust proxy", 1);
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Express du garage !");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose a mal tourné !");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM Utilisateurs WHERE Email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.error("Erreur lors de la recherche de l'utilisateur:", error);
        return res.status(500).send("Erreur lors de la connexion");
      }

      if (results.length > 0) {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.MotDePasse);

        if (isMatch) {
          const token = jwt.sign(
            { userId: user.ID_User, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({ message: "Connexion réussie !", token });
        } else {
          res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé." });
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
