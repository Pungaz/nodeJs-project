const express = require('express');
const router = express.Router();

const rentService = require('../service/users_service');
const authMiddleWare = require('../middle_wares/auth_middle_ware');

router.get('/', function (req, res, next) {
    res.send('Hello');
    next();
});

router.get('/rented', authMiddleWare.authenticate, async (req, res) => {
    const rentedMovies = await rentService.findRentedMovies();
    res.send(rentedMovies);
});

router.put('/rent', authMiddleWare.authenticate, async (req, res) => {
    await rentService.rentMovie(req.query.id);
    res.send(`Rented`);
});

router.put('/unrent', authMiddleWare.authenticate, async (req, res) => {
    await rentService.unRentMovie(req.query.id);
    res.send(`Unrented`);
});

module.exports = router;
