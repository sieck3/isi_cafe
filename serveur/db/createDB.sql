drop database if exists isisnack;
create database isisnack;
use isisnack;

create table privileges (
    id int primary key auto_increment not null,
    nom varchar(255) not null
);

create table utilisateurs (
    username varchar(255) primary key not null,
    idprivilege int not null,
    foreign key (idprivilege)
        references privileges(id),
    nom varchar(255) not null,
    prenom varchar(255) not null,
    hashmdp varchar(255) not null,
    inscription date not null
);

create table categories (
    id int primary key auto_increment not null,
    nom varchar(255) not null
);

create table produits (
    id int primary key auto_increment not null,
    nom varchar(255) not null,
    idcategorie int not null,
    foreign key (idcategorie)
        references categories(id),
    quantite int null,
    prix float not null,
    description varchar(255) null,
    perissable boolean not null
);

create table imagesproduits (
    idproduit int not null,
    foreign key (idproduit)
        references produits(id),
    path varchar(255) not null,
    primary key (idproduit,path)
);

create table commandes (
    id int primary key auto_increment not null,
    username varchar(255) not null,
    foreign key (username)
        references utilisateurs(username),
    creationdate date not null,
    dateramassage date not null,
    datepaye date null
);

create table produitscommandes (
    idcommande int not null,
    foreign key (idcommande)
        references commandes(id),
    idproduit int not null,
    foreign key (idproduit)
        references produits(id),
    primary key (idcommande,idproduit),
    quantite int not null
);

create table ventes (
    id int primary key auto_increment not null,
    datevente date not null,
    prixtotal float not null
);

create table produitsventes (
    idvente int not null,
    foreign key (idvente)
        references ventes(id),
    idproduit int not null,
    foreign key (idproduit)
        references produits(id),
    primary key (idvente,idproduit),
    quantite int not null
);

create table penalites (
    id int primary key auto_increment,
    debut date not null,
    fin date not null,
    penalisant varchar(255),
    foreign key (penalisant)
        references utilisateurs(username),
    penalise varchar(255),
    foreign key (penalise)
        references utilisateurs(username)
);