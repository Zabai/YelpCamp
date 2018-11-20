module.exports = {
    checkCampgroundOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            const id = req.params.id;

            Campground.findById(id, (err, campground) => {
                if(err) res.redirect('back');
                else {
                    if(campground.author.id.equals(req.user._id))
                        next();
                    else
                        res.redirect('/campgrounds/' + id);
                }
            });
        } else {
            res.redirect('back');
        }
    },

    checkCommentOwnership: function(req, res, next) {
        const campgroundId = req.params.id;
        const commentId = req.params.comment_id;

        Comment.findById(commentId, (err, comment) => {
            if(err) res.redirect('/campgrounds/' + campgroundId);
            else {
                if(comment.author.id.equals(req.user._id))
                    next();
                else
                    res.redirect('/campgrounds/' + campgroundId);
            }
        });
    }
};