const express = require('express');
const router = express.Router();
const moviesService = require('../service/movies_service');
const middleWare = require('../middle_wares/add_movie_middle_ware');
const authMiddleWare = require('../middle_wares/auth_middle_ware');

router.get('/', authMiddleWare.authenticate, async (req, res) => {
    const allMovies = await moviesService.findAllMovies();
    res.send(allMovies);
});

router.post('/addMovie', authMiddleWare.authenticate, authMiddleWare.authorizeAdmin, middleWare.addMovieMiddleWare, async (req, res) => {
    try {
        await moviesService.addMovie(req.body.name, req.body.rating, req.body.release_date);
        res.send('Dodat film u Db');
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

module.exports = router;
