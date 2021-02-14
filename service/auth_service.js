const repository = require('../repository/db_repository');
const bcrypt = require('bcrypt');

async function addUser(username, password, admin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await repository.insertUserToDb(username, hashedPassword, admin);
}

async function findUserByUsername(username) {
    return await repository.findUserByUsername(username);
}

async function getUserById(){
    return await repository.findUserById(id);
}

module.exports = {
    addUser: addUser,
    findUserByUsername: findUserByUsername,
    getUserById: getUserById,
};
