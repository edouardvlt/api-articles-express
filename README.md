# API Articles Express

Ce projet est une API REST pour gérer des articles, réalisée avec Node.js et Express.
J'ai mis en place une architecture DAO pour pouvoir changer de base de données facilement (MongoDB ou SQL).

## Installation

1. Installer les dépendances :
   npm install

2. Lancer le serveur :
   npm run dev

## Configuration

Il faut créer un fichier .env à la racine du projet avec ces variables :

DAO_TYPE=sequelize
PORT=3000
MONGO_URI=mongodb://localhost:27017/api_articles
JWT_SECRET=ma_cle_secrete

- Pour DAO_TYPE, on peut mettre "sequelize" (par défaut, utilise SQLite) ou "mongoose" (MongoDB).
- Si on utilise MongoDB, il faut que le serveur MongoDB soit lancé sur la machine.

## Les routes de l'API

L'URL de base est http://localhost:3000

- POST /login : Se connecter pour avoir un token (ex: isaac@gmail.com / mdp: password)
- GET /articles : Récupérer tous les articles
- GET /articles/:id : Récupérer un seul article
- POST /articles/save : Créer ou modifier un article (Il faut être connecté)
- DELETE /articles/:id : Supprimer un article (Il faut être connecté)

## Tests

Pour lancer les tests unitaires :
npm test

## Partie 3 - SonarQube

J'ai essayé de mettre en place SonarQube pour la troisième partie du TP (analyse de qualité de code), mais je n'ai pas réussi à le faire fonctionner à cause d'un problème sur ma machine.
