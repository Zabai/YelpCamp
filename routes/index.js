const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('landing.ejs');
});

router.use('/', require('./authentication'));
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    else res.redirect('/login');
}

router.use('/campgrounds', require('./campgrounds'));
router.use('/campgrounds/:id/comments', isLoggedIn, require('./comments'));

module.exports = router;