const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().trim().min(1).required(),
    rating: Joi.number().integer().max(10).min(1).required(),
    release_date: Joi.number().integer().min(1000).max(2050).required()
});

function addMovieMiddleWare(req, res, next) {
    let {error} = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.send("Validation error occurred");
    } else {
        next();
    }
}

module.exports = {
    addMovieMiddleWare : addMovieMiddleWare
};