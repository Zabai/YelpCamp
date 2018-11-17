const router = require('express').Router(),
    isLoggedIn = require('../middlewares/authentication').isLoggedIn;

router.get('/', (req, res, next) => {
    res.render('landing.ejs');
});

router.use('/', require('./authentication'));

router.use('/campgrounds', require('./campgrounds'));
router.use('/campgrounds/:id/comments', isLoggedIn, require('./comments'));

module.exports = router;