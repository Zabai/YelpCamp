const router = require('express').Router({mergeParams: true}),
    mongoose = require('mongoose'),
    Campground = mongoose.model('Campground'),
    Comment = mongoose.model('Comment');

// Base /campgrounds/:id/comments
// NEW
router.get('/new', (req, res, next) => {
    const id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if(err) res.redirect('/campground/' + id);
        else res.render('comments/new.ejs', {campground: campground});
    });
});

// CREATE
router.post('/', (req, res, next) => {
    const id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if(err) res.redirect('/campgrounds');
        else {
            const newComment = req.body.comment;
            Comment.create(newComment, (err, comment) => {
                if(err) res.redirect('/campgrounds/' + id + '/comments/new');
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + id);
                }
            });
        }
    });
});

module.exports = router;