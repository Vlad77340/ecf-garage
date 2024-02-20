ECF Garage
ECF Garage est une application web conçue pour gérer les opérations d'un garage automobile. Elle utilise React pour le frontend et Express pour le backend, avec une base de données MySQL.

Avant de commencer, assurez-vous d'avoir installé sur votre pc :

npm
Node.js ou yarn
MySQL (Assurez-vous que votre serveur MySQL est en fonctionnement et que vous ayez lancer le script garage.sql pour créer la base de données et les tables nécessaires)
Installation
Suivez ces étapes pour installer l'application :

Cloner le dépôt :

git clone https://exemple.com/ecf-garage.git
cd ecf-garage
Installer les dépendances :
npm install

ou si vous utilisez yarn :
yarn install

Configurer l'environnement :
Créez un fichier .env à la racine du projet et copier ceci :
DB_HOST=localhost
DB_USER=VotreUtilisateurMySQL
DB_PASS=VotreMotDePasseMySQL
DB_NAME=ecf-garage
DB_PORT=3306
JWT_SECRET=VotreCleSecreteJWT
le mot de passe de vincent : admin
le mot de passe de l'employé : employe

Démarrage de l'Application
L'application se compose d'un frontend React et d'un serveur Express.

Pour démarrer le serveur backend (Express) :

npm run server

Pour démarrer le frontend (React) en mode développement :

npm start

Pour lancer l'application en mode développement (frontend et backend simultanément) :

npm run dev

Dépendances Principales
React et React DOM : Bibliothèques pour construire l'interface utilisateur.
React Router DOM : Gestion des routes dans l'application React.
Bootstrap et React-Bootstrap : Framework CSS pour le design rapide et réactif.
Express : Infrastructure web pour créer le serveur backend.
MySQL : Client MySQL pour interagir avec votre base de données MySQL.
Bcrypt : Bibliothèque pour hasher et vérifier les mots de passe.
JSONWebToken : Implémentation des JSON Web Tokens pour l'authentification.
Helmet : Aide à sécuriser l'application Express en définissant divers en-têtes HTTP.
Cors : Middleware pour activer les requêtes CORS.
Dotenv : Charge les variables d'environnement à partir d'un fichier .env.
Express-rate-limit : Middleware pour limiter les requêtes répétées aux API et endpoints publics.
Tests
Pour exécuter les tests :

npm test
