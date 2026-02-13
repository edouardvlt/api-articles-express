require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { createDAO } = require('./dao/DAOFactory');
const ArticleService = require('./services/ArticleService');
const createArticleRouter = require('./routes/article-routes');
const authRouter = require('./auth/auth-routes');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

async function main() {
    try {
        const dao = await createDAO();

        const articleService = new ArticleService(dao);

        app.use(authRouter);

        const articleRouter = createArticleRouter(articleService);
        app.use('/articles', articleRouter);

        app.get('/', (req, res) => {
            res.send("Salut ! L'API fonctionne bien. Va sur /articles pour voir les données.");
        });

        app.listen(PORT, () => {
            console.log(`Le serveur tourne sur http://localhost:${PORT}`);
        });

    } catch (e) {
        console.log("Impossible de lancer le serveur : " + e);
    }
}

main();
