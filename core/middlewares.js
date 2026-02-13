const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'cle_privee';

const middlewareVerifyToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ code: "401", message: "Aucun token fourni !", data: null });
    }

    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ code: "401", message: "Token, mal formé", data: null });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ code: "401", message: "Token invalide ou expiré", data: null });
    }
};

module.exports = { middlewareVerifyToken };
