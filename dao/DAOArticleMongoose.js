const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: String,
    author: String,
    imgPath: String
});

articleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const ArticleModel = mongoose.model('Article', articleSchema);

class DAOArticleMongoose {

    async findAll() {
        return await ArticleModel.find();
    }

    async findById(id) {
        return await ArticleModel.findById(id);
    }

    async save(article) {
        if (article.id) {
            const updated = await ArticleModel.findByIdAndUpdate(article.id, article, { new: true });
            if (updated) return updated;
        }

        const newArticle = new ArticleModel(article);
        return await newArticle.save();
    }

    async deleteById(id) {
        const result = await ArticleModel.findByIdAndDelete(id);
        return result !== null;
    }
}

module.exports = DAOArticleMongoose;
