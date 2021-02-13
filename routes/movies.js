const express = require('express');
const router = express.Router();
const moviesService = require('../service/movies_service');
const middleWare = require('../middle_wares/add_movie_middle_ware');

router.get('/', async (req, res) => {
    const allMovies = await moviesService.findAllMovies();
    res.send(allMovies);
});

router.post('/addMovie', middleWare.addMovieMiddleWare, async (req, res) => {
    await moviesService.addMovie(req.body.name, req.body.rating, req.body.release_date);
    res.send('Dodat film u Db');
});

module.exports = router;
