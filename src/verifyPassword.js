const { verifyPassword } = require("./passwordUtils");

function loginUser(email, submittedPassword) {
  // récupération du hash de mot de passe depuis la base de données
  const storedHash = ""; // Remplacer par le vrai hash

  verifyPassword(submittedPassword, storedHash).then((isMatch) => {
    if (isMatch) {
      console.log("Connexion réussie pour:", email);
    } else {
      console.log("Échec de la connexion pour:", email);
    }
  });
}

// Exemple d'utilisation
loginUser("vincent.parrot@example.com", "le_mot_de_passe_tenté");
