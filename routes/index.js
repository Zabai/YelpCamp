const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('landing');
});

router.use('/campgrounds', require('./campgrounds'));

module.exports = router;