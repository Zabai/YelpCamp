const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res, next) => {
    res.render('landing');
});

const campgrounds = [
    {name: "Salmon Creek", image: "https://picsum.photos/200/300/?random"},
    {name: "Granite Hill", image: "https://picsum.photos/200/300/?random"},
    {name: "Mountain Goat's Rest", image: "https://picsum.photos/200/300/?random"}
];

app.get('/campgrounds', (req, res, next) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req, res, next) => {
    res.render("new");
});

app.post('/campgrounds', (req, res, next) => {
    const name = req.body.name;
    const image = req.body.image;
    const campground = {name: name, image:image};
    campgrounds.push(campground);

    res.redirect('/campgrounds');
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
