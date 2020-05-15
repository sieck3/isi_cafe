drop database if exists isisnack;
create database isisnack;
use isisnack;

CREATE TABLE privileges (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(255) NOT NULL
);

insert into privileges (nom) values ("client");
insert into privileges (nom) values ("employé");
insert into privileges (nom) values ("administrateur");

CREATE TABLE utilisateurs (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    idprivilege INT NOT NULL,
    FOREIGN KEY (idprivilege)
        REFERENCES privileges (id),
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    hashmdp VARCHAR(255) NOT NULL,
    inscription DATE NOT NULL
);

CREATE TABLE produits (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(255) NOT NULL,
    quantite INT NULL,
    prix FLOAT NOT NULL,
    description VARCHAR(255) NULL,
    perissable BOOLEAN NOT NULL
);

CREATE TABLE imagesproduits (
    idprod INT NOT NULL,
    FOREIGN KEY (idprod)
        REFERENCES produits (id),
    path VARCHAR(255) NOT NULL
);

CREATE TABLE commandes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (username)
        REFERENCES utilisateurs (username),
    creationdate DATE NOT NULL,
    dateramassage DATE NOT NULL,
    datepaye DATE NULL
);

CREATE TABLE produitscommandes (
    idcommande INT NOT NULL,
    FOREIGN KEY (idcommande)
        REFERENCES commandes (id),
    idproduit INT NOT NULL,
    FOREIGN KEY (idproduit)
        REFERENCES produits (id),
    quantite INT NOT NULL
);

CREATE TABLE ventes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    datevente DATE NOT NULL,
    prixtotal FLOAT NOT NULL
);

CREATE TABLE produitsventes (
    idvente INT NOT NULL,
    FOREIGN KEY (idvente)
        REFERENCES ventes (id),
    idproduit INT NOT NULL,
    FOREIGN KEY (idproduit)
        REFERENCES produits (id),
    quantite INT NOT NULL
);

CREATE TABLE penalites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    debut DATE NOT NULL,
    fin DATE NOT NULL,
    penalisant VARCHAR(255),
    FOREIGN KEY (penalisant)
        REFERENCES utilisateurs (username),
    penalise VARCHAR(255),
    FOREIGN KEY (penalise)
        REFERENCES utilisateurs (username)
);