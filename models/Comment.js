const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: String,
    text: String
});

mongoose.model('Comment', commentSchema);