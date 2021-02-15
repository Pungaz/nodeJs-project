const jsonwebtoken = require("jsonwebtoken");
const tokenSecret = require('../service/auth_service').tokenSecret;

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        req.auth = jsonwebtoken.verify(token, tokenSecret);
    } catch (err) {
        return res.sendStatus(401);
    }
    next();
}

function authorizeAdmin(req, res, next) {
    if (!req.auth.admin) {
        return res.sendStatus(403);
    }
    next();
}

module.exports = {
    authenticate: authenticate,
    authorizeAdmin: authorizeAdmin
}