// createUser.js

const { hashPassword } = require("./passwordUtils");

// Imaginons que cela soit appelé lors de la création d'un nouvel utilisateur
function createUser(email, plainPassword) {
  hashPassword(plainPassword).then((hashedPassword) => {
    // Ici, insérez l'utilisateur dans la base de données avec l'email et le hashedPassword
    console.log(
      `Création de l'utilisateur avec l'email: ${email} et le mot de passe haché: ${hashedPassword}`
    );
    // Exemple : insertUserIntoDatabase(email, hashedPassword);
  });
}

// Exemple d'utilisation
createUser("carole.parrot@example.com", "admin");
createUser("jan.foe@example.com", "employe");
