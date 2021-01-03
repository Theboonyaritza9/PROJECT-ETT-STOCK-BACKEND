const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    deadline: { type: Date, default: Date.now },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Todolist', todolistSchema)