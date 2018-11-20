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
    }
};