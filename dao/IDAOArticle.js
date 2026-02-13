class IDAOArticle {

    async findAll() {
        throw new Error("Méthode findAll() non implémentée");
    }

    async findById(id) {
        throw new Error("Méthode findById() non implémentée");
    }

    async save(article) {
        throw new Error("Méthode save() non implémentée");
    }

    async deleteById(id) {
        throw new Error("Méthode deleteById() non implémentée");
    }
}

module.exports = IDAOArticle;
