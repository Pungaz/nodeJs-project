const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const passport = require('passport');
const initializePassport = require('./passport-config');
const session = require("express-session");
const findUserByUsername = require('./service/auth_service').findUserByUsername;
const getUserById = require('./service/auth_service').getUserById;

const app = express();
initializePassport.init(passport, findUserByUsername, getUserById);

app.use(express.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/movies', moviesRouter);

app.listen(3000, 'localhost', () => {
    console.log('server started');
})

module.exports = app;
