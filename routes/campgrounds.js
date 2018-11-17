const router = require('express').Router(),
    mongoose = require('mongoose'),
    Campground = mongoose.model('Campground'),
    isLoggedIn = require('../middlewares/authentication').isLoggedIn;

// Base: /campgrounds
// INDEX
router.get('/', (req, res, next) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) console.log(err);
        else res.render('campgrounds/index.ejs', {campgrounds: campgrounds});
    });
});

// NEW
router.get('/new', isLoggedIn, (req, res, next) => {
    res.render("campgrounds/new.ejs");
});

// SHOW
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Campground.findById(id).populate('comments').exec((err, campground) => {
        if(err) console.log(err);
        else res.render("campgrounds/show.ejs", {campground: campground});
    });
});

// CREATE
router.post('/', isLoggedIn, (req, res, next) => {
    const campground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };

    Campground.create(campground, (err, campground) => {
        if(err) console.log(err);
        else res.redirect('/campgrounds');
    });
});

module.exports = router;