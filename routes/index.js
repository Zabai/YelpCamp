const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('landing.ejs');
});

router.use('/campgrounds', require('./campgrounds'));
router.use('/campgrounds/:id/comments', require('./comments'));

module.exports = router;