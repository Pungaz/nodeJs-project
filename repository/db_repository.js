const mysql = require('mysql');
const util = require('util');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'script-node'
}

function makeDb(config) {
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}

async function findUserByUsername(username) {
    const db = makeDb(dbConfig);
    try {
        const users = await db.query("SELECT * FROM user WHERE username = ?", [username]);
        for (let user in users) {
            if (users.hasOwnProperty(user)) {
                return {
                    id: users[user].id,
                    username: users[user].username,
                    password: users[user].password,
                }
            }
        }
    } finally {
        db.close();
    }
}

async function findUserByUsernameAndPassword(username, password) {
    const db = makeDb(dbConfig);
    try {
        const users = await db.query("SELECT * FROM user WHERE username = ? and password = ?", [username, password]);
        for (let user in users) {
            if (users.hasOwnProperty(user)) {
                return {
                    id: users[user].id,
                    username: users[user].username,
                    password: users[user].password,
                }
            }
        }
    } finally {
        db.close();
    }
}

async function insertUserToDb(username, password, admin) {
    const db = makeDb(dbConfig);
    try {
        const users = await db.query("SELECT * FROM user WHERE username = ?", [username]);
        if (!users.length) {
            await db.query("INSERT INTO user (username, password, admin) VALUES (?, ?, ?)", [username, password, admin]);
        } else {
            console.log('Username taken');
            throw new Error('Username taken');
        }
    } finally {
        db.close();
    }
}

async function insertMovieToDb(name, status, rating, releaseDate) {
    const db = makeDb(dbConfig);
    try {
        await db.query("INSERT INTO movies (name, status, rating, release_date) VALUES (?, ?, ?, ?) ", [name, status, rating, releaseDate]);
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    console.log("Ubaceno iz DB REPO");
}

async function addRentingToDb(renting) {
    const db = makeDb(dbConfig)
    try {
        await db.query("UPDATE movies SET status = 'rented' WHERE id = ?", [renting.id]);
    } catch (err) {
        console.log(err)
    } finally {
        db.close();
    }
}

async function getRentedMoviesFromDb() {
    const rentedMoviesArray = [];
    const db = makeDb(dbConfig);

    try {
        const movies = await db.query("SELECT * FROM movies WHERE status LIKE 'rented'");

        for (let movie in movies) {
            if (movies.hasOwnProperty(movie)) {
                rentedMoviesArray.push({
                    name: movies[movie].name,
                    status: movies[movie].status,
                    rating: movies[movie].rating,
                    release_date: movies[movie].release_date
                });
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db.close();
    }

    return rentedMoviesArray;
}

async function getAllMoviesFromDb() {
    const allMoviesArray = [];
    const db = makeDb(dbConfig);

    try {
        const movies = await db.query('SELECT * from movies');

        for (let movie in movies) {
            if (movies.hasOwnProperty(movie)) {
                allMoviesArray.push({
                    id: movies[movie].id,
                    name: movies[movie].name,
                    status: movies[movie].status,
                    rating: movies[movie].rating,
                    release_date: movies[movie].release_date
                });
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db.close();
    }

    return allMoviesArray;
}

module.exports = {
    addRentingToDb: addRentingToDb,
    getRentedMoviesFromDb: getRentedMoviesFromDb,
    getAllMoviesFromDb: getAllMoviesFromDb,
    insertMovieToDb: insertMovieToDb,
    insertUserToDb: insertUserToDb,
    findUserByUsername: findUserByUsername,
    findUserByUsernameAndPassword: findUserByUsernameAndPassword,
};
