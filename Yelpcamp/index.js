const Campground = require('./models/campground');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  autoCreate: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_, res) => {
  res.render('home');
});

app.get('/campground', async (_, res) => {
  const camp = new Campground({
    title: 'My Backyard',
    description: 'Cheap camping!',
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
