const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().trim().min(1).required(),
    password: Joi.string().trim().min(6).required(),
    admin: Joi.boolean().required()
});

function addUserMiddleWare(req, res, next) {
    const {error} = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.send("Validation error occurred");
    } else {
        next();
    }
}

module.exports = {
    addUserMiddleWare: addUserMiddleWare
};
