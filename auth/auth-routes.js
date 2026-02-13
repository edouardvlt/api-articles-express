const express = require('express');
const jwt = require('jsonwebtoken');
const { httpApiResponse } = require('../core/http-response');

const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'cle_privee';

const users = [
    { email: 'isaac@gmail.com', password: 'password', pseudo: 'Isaac' },
    { email: 'tata@gmail.com', password: '123456', pseudo: 'Tata' },
    { email: 'toto@gmail.com', password: '12345', pseudo: 'Toto' }
];

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return httpApiResponse(res, "400", "Il manque l'email ou le mot de passe !", null);
    }

    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);

    if (!user) {
        return httpApiResponse(res, "401", "Identifiants incorrects", null);
    }

    const token = jwt.sign(
        { email: user.email, pseudo: user.pseudo },
        SECRET,
        { expiresIn: '24h' }
    );

    httpApiResponse(res, "200", "Connexion réussie", token);
});

module.exports = router;
