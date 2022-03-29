var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var authRouter = require('./routes/authRouter');
var orgRouter = require('./routes/orgRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.LOGGER == 'true') {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/org', orgRouter);

app.use(express.static(path.join(__dirname, 'public/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;
