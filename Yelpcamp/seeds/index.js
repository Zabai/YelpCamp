const Campground = require('../models/campground');
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  autoCreate: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const campground = new Campground({
      description: faker.lorem.paragraph(),
      image: 'https://source.unsplash.com/collection/483251',
      location: faker.address.cityName(),
      price: faker.commerce.price(),
      title: faker.name.title(),
    });
    await campground.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
