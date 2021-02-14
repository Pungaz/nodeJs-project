const express = require('express');
const router = express.Router();
const authService = require('../service/auth_service');
const userMiddleWare = require('../middle_wares/register_middle_ware');

router.post('/register', userMiddleWare.registerMiddleWare, async (req, res) => {
    try {
        await authService.register(req.body.username, req.body.password, req.body.admin);
        res.send("User registered");
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = await authService.login(req.body.username, req.body.password);
        res.send(token);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});

module.exports = router;
