const router = require('express').Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

// Base: /
// Signing up
router.get('/register', (req, res, next) => {
    res.render('authentication/register.ejs');
});

router.post('/register', (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
    });
    User.register(newUser, req.body.password, (err, user) => {
        if(err) console.log(err);
        else passport.authenticate('local')(req, res, () => res.redirect('/'));
    });
});

// Logging in
router.get('/login', (req, res, next) => {
    res.render('authentication/login.ejs');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    })
);

// Logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;