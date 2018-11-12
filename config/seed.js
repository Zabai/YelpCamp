const mongoose = require('mongoose'),
    Campground = mongoose.model('Campground');

Campground.remove({}, (err) => {
    if(err) console.log(err);
    else console.log('Campgrounds removed')
});

Campground.create({
    name: "Salmon Creek",
    image: "http://www.gobroomecounty.com/files/hd/Campground1.jpg",
    description: "Perfect for fishing"
}, (err, campground) => {
    if(err) console.log(err);
    else console.log('Campground created: ', campground);
});

Campground.create({
    name: "Granite Hill",
    image: "http://www.oceancove.org/images/ca11129.jpg",
    description: "Perfect for hiking"
}, (err, campground) => {
    if(err) console.log(err);
    else console.log('Campground created: ', campground);
});

Campground.create({
    name: "Green Mesa",
    image: "https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg",
    description: "Perfect for relax"
}, (err, campground) => {
    if(err) console.log(err);
    else console.log('Campground created: ', campground);
});