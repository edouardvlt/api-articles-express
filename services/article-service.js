class ArticleService {

    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.findAll();
    }

    async getById(id) {
        return await this.dao.findById(id);
    }

    async save(article) {
        return await this.dao.save(article);
    }

    async deleteById(id) {
        return await this.dao.deleteById(id);
    }
}

module.exports = ArticleService;
