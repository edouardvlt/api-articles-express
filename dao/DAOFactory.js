const mongoose = require('mongoose');

async function createDAO() {

    const type = process.env.DAO_TYPE || 'mock';

    if (type === 'mongoose') {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/api_articles';
        await mongoose.connect(uri);
        console.log('Connecté à MongoDB');

        const DAOArticleMongoose = require('./DAOArticleMongoose');
        return new DAOArticleMongoose();

    } else if (type === 'sequelize') {
        const DAOArticleSequelize = require('./DAOArticleSequelize');
        const dao = new DAOArticleSequelize();
        await dao.sync();
        console.log('Base SQLite synchronisée');

        return dao;

    } else {
        const DAOArticleMock = require('./DAOArticleMock');
        console.log('Mode Mock activé (données en mémoire)');
        return new DAOArticleMock();
    }
}

module.exports = { createDAO };
