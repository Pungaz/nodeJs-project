const repository = require('../repository/db_repository');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const tokenSecret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
const salt = '$2b$10$BdlYo15tIgJrolcXso86rO ';

async function register(username, password, admin) {
    const hashedPassword = await bcrypt.hash(password, salt);
    await repository.insertUserToDb(username, hashedPassword, admin);
}

async function findUserByUsername(username) {
    return await repository.findUserByUsername(username);
}

async function login(username, password) {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await repository.findUserByUsernameAndPassword(username, hashedPassword);

    if (!user) {
        throw new Error('Wrong email or password');
    }

    return jsonwebtoken.sign({username}, tokenSecret, {
        algorithm: "HS256"
    });
}

module.exports = {
    register: register,
    findUserByUsername: findUserByUsername,
    login: login,
    tokenSecret: tokenSecret,
};
