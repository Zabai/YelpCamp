const express = require('express'),
    createError = require('http-errors'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

mongoose.connect('mongodb://localhost/yelp_camp');

// Models
require('./models/User');
require('./models/Campground');
require('./models/Comment');
require('./config/seed');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: "This should be secure",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(mongoose.model('User').authenticate()));
passport.serializeUser(mongoose.model('User').serializeUser());
passport.deserializeUser(mongoose.model('User').deserializeUser());

// Global vars
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Routing
app.use(require('./routes'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send('error' + err);
});

module.exports = app;
