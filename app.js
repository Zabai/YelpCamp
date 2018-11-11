const express = require('express'),
    createError = require('http-errors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

// Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

/*Campground.create(
    {
        name: "Salmon Creek",
        image: "https://picsum.photos/200/300/?random",
        description: "Perfect for fishing"
    }
);*/

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
    {name: "Mountain Goat's Rest", image: "https://picsum.photos/200/300/?random"},
    {name: "Salmon Creek", image: "https://picsum.photos/200/300/?random"},
    {name: "Granite Hill", image: "https://picsum.photos/200/300/?random"},
    {name: "Mountain Goat's Rest", image: "https://picsum.photos/200/300/?random"},
    {name: "Salmon Creek", image: "https://picsum.photos/200/300/?random"},
    {name: "Granite Hill", image: "https://picsum.photos/200/300/?random"},
    {name: "Mountain Goat's Rest", image: "https://picsum.photos/200/300/?random"},
];

app.get('/campgrounds', (req, res, next) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) console.log(err);
        else res.render('index.ejs', {campgrounds: campgrounds});
    });
});

app.get('/campgrounds/new', (req, res, next) => {
    res.render("new");
});

app.get('/campgrounds/:id', (req, res, next) => {
    const id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if(err) console.log(err);
        else res.render("show", {campground: campground});
    });
});

app.post('/campgrounds', (req, res, next) => {
    const campground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };

    Campground.create(campground, (err, campground) => {
        if(err) console.log(err);
        else res.redirect('/campgrounds');
    });
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
