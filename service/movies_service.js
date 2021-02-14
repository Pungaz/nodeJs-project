const repository = require('../repository/db_repository');

async function findAllMoviesFunction() {
    const movies = await repository.getAllMoviesFromDb();
    return {movies: movies};
}

async function addMovie(name, rating, releaseDate) {
    const ratingInt = parseInt(rating);
    const releaseDateInt = parseInt(releaseDate);

    if (Number.isInteger(ratingInt) && Number.isInteger(releaseDateInt)) {
        await repository.insertMovieToDb(name, "Nije", ratingInt, releaseDateInt);
        console.log("Ubaceno iz MOVIE_SERVICE");
    } else {
        console.log(new Error('GRESKAA'));
    }
}

module.exports = {
    findAllMovies: findAllMoviesFunction,
    addMovie: addMovie
};
