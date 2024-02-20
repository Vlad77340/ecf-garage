-- Création de la base de données garage
CREATE DATABASE garage;

USE garage;

-- Création de la table Utilisateurs
CREATE TABLE Utilisateurs (
    ID_User INT AUTO_INCREMENT PRIMARY KEY, Nom VARCHAR(50), Prenom VARCHAR(50), Email VARCHAR(100) UNIQUE, MotDePasse VARCHAR(255), Role ENUM('Administrateur', 'Employe') NOT NULL
);

-- Insertion des utilisateurs initiaux
INSERT INTO
    Utilisateurs (
        Nom, Prenom, Email, MotDePasse, Role
    )
VALUES (
        'Parrot', 'Vincent', 'vincent.parrot@example.com', '$2b$10$3vQn6fYbPnpmu3vvTOwhmOLQKZpc/w0ub185ZS8B5qFCJwp6cEvA.', 'Administrateur'
    ),
    (
        'Doe', 'John', 'john.doe@example.com', '$2b$10$ZrWN5DW8r0Z.r9NyKW60/.I2Mp.AbGqxaQ6J9VGn/lbjxB7JIhf76', 'Employe'
    );

-- Création de la table Véhicules
CREATE TABLE Vehicules (
    ID_Vehicule INT AUTO_INCREMENT PRIMARY KEY, Image VARCHAR(255), Marque VARCHAR(50), Modele VARCHAR(50), Kilometre INT, Annee YEAR, Prix DECIMAL(10, 2), Type ENUM('Neuf', 'Occasion') NOT NULL, Disponibilite ENUM('Vendu', 'Disponible') NOT NULL, ID_User INT, FOREIGN KEY (ID_User) REFERENCES Utilisateurs (ID_User) ON DELETE SET NULL
);

INSERT INTO
    Vehicules (
        Image, Marque, Modele, Kilometre, Annee, Prix, Type, Disponibilite, ID_User
    )
VALUES (
        '/voiture_garage/toyota_coro.jpg', 'Toyota', 'Corolla', 50000, 2018, 15000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/hoda_civic.jpg', 'Honda', 'Civic', 60000, 2017, 14000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/ford_focus.jpg', 'Ford', 'Focus', 45000, 2019, 16000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/chevrolet_malibu.jpg', 'Chevrolet', 'Malibu', 55000, 2016, 13000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/nissan_altima.jpg', 'Nissan', 'Altima', 148000, 2017, 11500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/toyota_camry.jpg', 'Toyota', 'Camry', 52000, 2018, 15500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/honda_accord.jpg', 'Honda', 'Accord', 56000, 2016, 13500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/honda_fusion.jpg', 'Ford', 'Fusion', 49000, 2019, 16500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/chevrolet_impala.jpg', 'Chevrolet', 'Impala', 160000, 2017, 12000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/nissan_maxima.jpg', 'Nissan', 'Maxima', 53000, 2018, 15000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/toyota_rav4.jpg', 'Toyota', 'Rav4', 45000, 2019, 17000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/hondacrv.jpg', 'Honda', 'CR-V', 58000, 2017, 14500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/ford_escape.jpg', 'Ford', 'Escape', 51000, 2018, 16000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/chevrolet_equinox.jpg', 'Chevrolet', 'Equinox', 57000, 2016, 14000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/nissan_rogue.jpg', 'Nissan', 'Rogue', 49000, 2019, 17500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/toyota_highlander.jpg', 'Toyota', 'Highlander', 55000, 2017, 15000.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/honda_pilot.jpg', 'Honda', 'Pilot', 52000, 2018, 15500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/ford_explorer.jpg', 'Ford', 'Explorer', 39000, 2016, 14500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/chevrolet_traverse.jpg', 'Chevrolet', 'Traverse', 48000, 2019, 16500.00, 'Occasion', 'Disponible', NULL
    ),
    (
        '/voiture_garage/nissan_pathfinder.jpg', 'Nissan', 'Pathfinder', 26000, 2018, 16000.00, 'Occasion', 'Disponible', NULL
    );

-- Création de la table Services
CREATE TABLE Services (
    ID_Service INT AUTO_INCREMENT PRIMARY KEY, Description TEXT, Prix DECIMAL(10, 2), DureeEstimee TIME, ID_User INT NULL, -- Permettre NULL pour ID_User
    FOREIGN KEY (ID_User) REFERENCES Utilisateurs (ID_User)
);

INSERT INTO
    Services (
        Description, Prix, DureeEstimee, ID_User
    )
VALUES (
        'Vidange', 50.00, '01:00:00', NULL
    ),
    (
        'Changement de pneus', 80.00, '01:30:00', NULL
    ),
    (
        'Réparation moteur', 150.00, '02:00:00', NULL
    ),
    (
        'Entretien climatisation', 100.00, '01:30:00', NULL
    ),
    (
        'Diagnostic électronique', 120.00, '02:00:00', NULL
    ),
    (
        'Remplacement batterie', 70.00, '01:00:00', NULL
    ),
    (
        'Révision générale', 200.00, '03:00:00', NULL
    ),
    (
        'Nettoyage intérieur et extérieur', 80.00, '02:00:00', NULL
    );

-- Création de la table Horaires d'ouverture
CREATE TABLE HorairesOuverture (
    ID_Horaire INT AUTO_INCREMENT PRIMARY KEY, Jour VARCHAR(10) UNIQUE, Heure_Ouverture TIME, Heure_Fermeture TIME
);

INSERT INTO
    HorairesOuverture (
        Jour, Heure_Ouverture, Heure_Fermeture
    )
VALUES ('Lundi', '10:00', '18:00'),
    ('Mardi', '10:00', '18:00'),
    ('Mercredi', '10:00', '18:00'),
    ('Jeudi', '10:00', '18:00'),
    ('Vendredi', '10:00', '18:00'),
    ('Samedi', '10:00', '18:00');
-- Création de la table Commentaires
CREATE TABLE Commentaires (
    ID_Commentaire INT AUTO_INCREMENT PRIMARY KEY, Nom VARCHAR(50) NOT NULL, -- Nom de l'utilisateur ou du visiteur laissant le commentaire
    ID_User INT NULL, -- ID de l'utilisateur si enregistré, sinon NULL pour un visiteur
    Texte TEXT NOT NULL, Date DATE NOT NULL, Approuve BOOLEAN NOT NULL, FOREIGN KEY (ID_User) REFERENCES Utilisateurs (ID_User)
);

GRANT ALL PRIVILEGES ON garage.* TO 'vincent' @'localhost' IDENTIFIED BY '$2b$10$3vQn6fYbPnpmu3vvTOwhmOLQKZpc/w0ub185ZS8B5qFCJwp6cEvA.';

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON garage.Vehicules TO 'john' @'localhost' IDENTIFIED BY '$2b$10$ZrWN5DW8r0Z.r9NyKW60/.I2Mp.AbGqxaQ6J9VGn/lbjxB7JIhf76';

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON garage.Commentaires TO 'john' @'localhost' IDENTIFIED BY '$2b$10$ZrWN5DW8r0Z.r9NyKW60/.I2Mp.AbGqxaQ6J9VGn/lbjxB7JIhf76';