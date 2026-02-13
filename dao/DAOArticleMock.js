const { v4: uuidv4 } = require('uuid');

class DAOArticleMock {

    constructor() {
        this.articles = [];
    }

    async findAll() {
        return this.articles;
    }

    async findById(id) {
        return this.articles.find(a => a.id === id) || null;
    }

    async save(article) {
        if (article.id) {
            const index = this.articles.findIndex(a => a.id === article.id);
            if (index !== -1) {
                this.articles[index] = { ...this.articles[index], ...article };
                return this.articles[index];
            }
        }

        const newArticle = {
            id: uuidv4(),
            title: article.title,
            desc: article.desc,
            author: article.author,
            imgPath: article.imgPath
        };
        this.articles.push(newArticle);
        return newArticle;
    }

    async deleteById(id) {
        const index = this.articles.findIndex(a => a.id === id);
        if (index === -1) return false;

        this.articles.splice(index, 1);
        return true;
    }
}

module.exports = DAOArticleMock;
