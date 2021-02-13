const mysql = require('mysql');
const util = require('util');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'knje2m',
    database: 'script'
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

async function insertMovieToDb(name, status, rating, releaseDate){
    const db = makeDb(dbConfig);
    try {
        await db.query("INSERT INTO movies (name, status, rating, release_date) VALUES (?, ?, ?, ?) ", [name, status, rating, releaseDate]);


    }catch (err){
        console.log(err);
    }finally {
        db.close();
    }
    console.log("Ubaceno iz DB REPO");
}

async function addRentingToDb(renting) {
    const db = makeDb(dbConfig)
    try {
        await db.query("UPDATE movies SET status = 'rented' WHERE id = ?", [renting.id]);

    }catch (err){
        console.log(err)
    }finally {
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
    insertMovieToDb: insertMovieToDb
};

