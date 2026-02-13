const ArticleService = require('../services/ArticleService');
const DAOArticleMock = require('../dao/DAOArticleMock');

describe('ArticleService (avec DAOArticleMock)', () => {
    let dao;
    let service;

    beforeEach(() => {
        dao = new DAOArticleMock();
        service = new ArticleService(dao);
    });

    test('getAll() retourne un tableau vide au départ', async () => {
        const articles = await service.getAll();
        expect(articles).toEqual([]);
        expect(Array.isArray(articles)).toBe(true);
    });

    test('getAll() retourne les articles après ajout', async () => {
        await service.save({ title: 'Article 1', desc: 'Desc 1', author: 'Isaac', imgPath: '' });
        await service.save({ title: 'Article 2', desc: 'Desc 2', author: 'Sanchez', imgPath: '' });

        const articles = await service.getAll();
        expect(articles).toHaveLength(2);
    });

    test('save() crée un article avec un id généré', async () => {
        const article = await service.save({
            title: 'Test Article',
            desc: 'Description test',
            author: 'Toto',
            imgPath: ''
        });

        expect(article).toBeDefined();
        expect(article.id).toBeDefined();
        expect(article.title).toBe('Test Article');
        expect(article.author).toBe('Toto');
    });

    test('getById() retrouve un article existant', async () => {
        const created = await service.save({ title: 'Mon Article', desc: '', author: 'Isaac', imgPath: '' });
        const found = await service.getById(created.id);

        expect(found).toBeDefined();
        expect(found.id).toBe(created.id);
        expect(found.title).toBe('Mon Article');
    });

    test('getById() retourne null pour un id inexistant', async () => {
        const found = await service.getById('id-inexistant');
        expect(found).toBeNull();
    });

    test('save() modifie un article existant si un id est fourni', async () => {
        const created = await service.save({ title: 'Original', desc: '', author: 'Isaac', imgPath: '' });

        const modified = await service.save({
            id: created.id,
            title: 'Modifié',
            desc: 'Nouvelle description',
            author: 'Isaac',
            imgPath: ''
        });

        expect(modified.id).toBe(created.id);
        expect(modified.title).toBe('Modifié');
        expect(modified.desc).toBe('Nouvelle description');

        const all = await service.getAll();
        expect(all).toHaveLength(1);
    });

    test('deleteById() supprime un article et retourne true', async () => {
        const created = await service.save({ title: 'À supprimer', desc: '', author: '', imgPath: '' });

        const result = await service.deleteById(created.id);
        expect(result).toBe(true);

        const all = await service.getAll();
        expect(all).toHaveLength(0);
    });

    test('deleteById() retourne false pour un id inexistant', async () => {
        const result = await service.deleteById('id-inexistant');
        expect(result).toBe(false);
    });
});
