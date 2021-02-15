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

async function unRentMovie(id){
    const idint = parseInt(id);
    if (Number.isInteger(idint)) {
        await repository.removeRentingFromDb({id: id});
    }
}

module.exports = {
    rentMovie: rentMovie,
    findRentedMovies: findRentedMovies,
    unRentMovie: unRentMovie,
}
