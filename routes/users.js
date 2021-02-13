const express = require('express');
const router = express.Router();

const rentService = require('../service/users_service');

router.get('/', function (req, res, next) {
    res.send('Hello');
    next();
});

router.get('/rented', async (req, res) => {
    const rentedMovies = await rentService.findRentedMovies();
    res.send(rentedMovies);
});

router.put('/rent',  async (req, res) => {
    await rentService.rentMovie(req.query.id);
    res.send(`Created`);
});

module.exports = router;
