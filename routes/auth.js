const express = require('express');
const router = express.Router();
const authService = require('../service/auth_service');
const userMiddleWare = require('../middle_wares/add_user_middle_ware');
const passport = require('passport');

router.post('/register', userMiddleWare.addUserMiddleWare, async (req, res) => {
    try {
        await authService.addUser(req.body.username, req.body.password, req.body.admin);
        res.send("User registered");
    } catch (err) {
        res.send('Username taken');
    }
});

router.post('/login',
    passport.authenticate('local', {}),
    (req, res) => {
        res.send(req.session);
    });

module.exports = router;
