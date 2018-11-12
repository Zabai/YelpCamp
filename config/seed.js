const mongoose = require('mongoose'),
    Campground = mongoose.model('Campground'),
    Comment = mongoose.model('Comment');

Campground.remove({}, (err) => {
    if(err) console.log(err);
    else {
        console.log('Campgrounds removed');
        seedCampgrounds();
    }
});

function seedCampgrounds() {
    Campground.create({
        name: "Salmon Creek",
        image: "http://www.gobroomecounty.com/files/hd/Campground1.jpg",
        description: "Perfect for fishing"
    }, (err, campground) => {
        if(err) console.log(err);
        else {
            Comment.create({author: "Dante", text: "No demons here"}, (err, comment) => {
                if(err) console.log(err);
                else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log('Campground created: ', campground);
                }
            });
        }
    });

    Campground.create({
        name: "Granite Hill",
        image: "http://www.oceancove.org/images/ca11129.jpg",
        description: "Perfect for hiking"
    }, (err, campground) => {
        if(err) console.log(err);
        else {
            Comment.create({author: "Vergil", text: "Where is Dante?!?!?!"}, (err, comment) => {
                if(err) console.log(err);
                else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log('Campground created: ', campground);
                }
            });
        }
    });

    Campground.create({
        name: "Green Mesa",
        image: "https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg",
        description: "Perfect for relax"
    }, (err, campground) => {
        if(err) console.log(err);
        else {
            Comment.create({author: "Nero", text: "Vacation"}, (err, comment) => {
                if(err) console.log(err);
                else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log('Campground created: ', campground);
                }
            });
        }
    });
}