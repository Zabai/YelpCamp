const router = require('express').Router({mergeParams: true}),
    mongoose = require('mongoose'),
    Campground = mongoose.model('Campground'),
    Comment = mongoose.model('Comment'),
    checkCommentOwnership = require('../middlewares/authorization').checkCommentOwnership;

// Base: /campgrounds/:id/comments
// Requirements: user authenticated
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
            newComment.author = {
                id: req.user._id,
                username: req.user.username
            };
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

// EDIT
router.get('/:comment_id/edit', checkCommentOwnership, (req, res, next) => {
    const campgroundId = req.params.id;
    const commentId = req.params.comment_id;
    Comment.findById(commentId, (err, comment) => {
        if(err) res.redirect('/campgrounds/' + id);
        else res.render('comments/edit.ejs', {campgroundId: campgroundId, comment: comment});
    });
});

// UPDATE
router.put('/:comment_id', checkCommentOwnership, (req, res, next) => {
    const campgroundId = req.params.id;
    const commentId = req.params.comment_id;
    const comment = req.body.comment;

    Comment.findByIdAndUpdate(commentId, comment, (err, updatedComment) =>{
        if(err) res.redirect('/campgrounds/' + campgroundId + '/comments/' + commentId + '/edit');
        else res.redirect('/campgrounds/' + campgroundId);
    })
});

// DELETE
router.delete('/:comment_id', checkCommentOwnership, (req, res, next) => {
    const campgroundId = req.params.id;
    const commentId = req.params.comment_id;

    Comment.findByIdAndRemove(commentId, (err) => {
        res.redirect('/campgrounds/' + campgroundId);
    });
});

module.exports = router;