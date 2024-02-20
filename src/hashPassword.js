// hashPasswords.js
const bcrypt = require("bcrypt");
const saltRounds = 10; // Définit la complexité du hachage

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Le mot de passe haché est : ${hashedPassword}`);
    return hashedPassword;
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe:", error);
  }
}

// Exemples d'utilisation
async function hashInitialPasswords() {
  const vincentPassword = "admin";
  const johnPassword = "employe";

  const hashedVincentPassword = await hashPassword(vincentPassword);
  const hashedJohnPassword = await hashPassword(johnPassword);

  // Ici, vous pouvez insérer les mots de passe hachés dans votre base de données
  console.log(`Mot de passe haché pour Vincent: ${hashedVincentPassword}`);
  console.log(`Mot de passe haché pour John: ${hashedJohnPassword}`);
}

// Exécuter la fonction pour hacher les mots de passe initiaux
hashInitialPasswords();
