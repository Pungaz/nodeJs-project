const repository = require('../repository/db_repository');

async function rentMovie(id) {
    const idint = parseInt(id);
    if (Number.isInteger(idint)) {
        await repository.addRentingToDb({id: id});
    }
}

async function findRentedMovies() {
    const rentedMovies = await repository.getRentedMoviesFromDb();
    return {rentedMovies: rentedMovies};
}

module.exports = {
    rentMovie: rentMovie,
    findRentedMovies: findRentedMovies
}
