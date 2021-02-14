const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/movies', moviesRouter);

app.listen(3000, 'localhost', () => {
    console.log('server started');
})

module.exports = app;
