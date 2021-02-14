const jsonwebtoken = require("jsonwebtoken");
const tokenSecret = require('../service/auth_service').tokenSecret;

function authenticateToken(req, res, next) {
    console.log('AAAAAAAAAA')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    console.log('BBBBBBBB')

    const payload = jsonwebtoken.verify(token, tokenSecret);
    console.log(payload);

    next();
}

module.exports = {
    authenticateToken: authenticateToken,
}