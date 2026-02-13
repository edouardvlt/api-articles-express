const { Sequelize, DataTypes } = require('sequelize');
const IDAOArticle = require('./IDAOArticle');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    imgPath: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, {
    timestamps: false
});

class DAOArticleSequelize extends IDAOArticle {

    async sync() {
        await sequelize.sync();
    }

    async findAll() {
        return await Article.findAll();
    }

    async findById(id) {
        return await Article.findByPk(id);
    }

    async save(article) {
        if (article.id) {
            const existing = await Article.findByPk(article.id);
            if (existing) {
                return await existing.update({
                    title: article.title,
                    desc: article.desc,
                    author: article.author,
                    imgPath: article.imgPath
                });
            }
        }

        const newArticle = await Article.create({
            title: article.title,
            desc: article.desc,
            author: article.author,
            imgPath: article.imgPath
        });
        return newArticle;
    }

    async deleteById(id) {
        const nbDeleted = await Article.destroy({ where: { id: id } });
        return nbDeleted > 0;
    }
}

module.exports = DAOArticleSequelize;
