const express = require('express');
const { httpApiResponse } = require('../core/http-response');
const { middlewareVerifyToken } = require('../core/middlewares');

function createArticleRouter(service) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const articles = await service.getAll();
            httpApiResponse(res, "200", "Liste des articles OK", articles);
        } catch (e) {
            httpApiResponse(res, "500", "Problème serveur", null);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const article = await service.getById(req.params.id);

            if (!article) {
                return httpApiResponse(res, "404", "Article introuvable", null);
            }

            httpApiResponse(res, "200", "Article trouvé", article);
        } catch (e) {
            httpApiResponse(res, "500", "Erreur serveur", null);
        }
    });

    router.post("/save", middlewareVerifyToken, async (req, res) => {
        try {
            const nouvelArticle = req.body;
            const articleSauvegarde = await service.save(nouvelArticle);

            httpApiResponse(res, "200", "Article enregistré !", articleSauvegarde);
        } catch (e) {
            httpApiResponse(res, "500", "Erreur lors de la sauvegarde", null);
        }
    });

    router.delete("/:id", middlewareVerifyToken, async (req, res) => {
        try {
            const success = await service.deleteById(req.params.id);

            if (!success) {
                return httpApiResponse(res, "404", "Impossible de supprimer (article inexistant ?)", null);
            }

            httpApiResponse(res, "200", "Article supprimé", null);
        } catch (e) {
            httpApiResponse(res, "500", "Erreur lors de la suppression", null);
        }
    });

    return router;
}

module.exports = createArticleRouter;
