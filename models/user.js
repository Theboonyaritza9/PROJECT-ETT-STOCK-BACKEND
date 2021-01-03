const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
    auth: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('User', userSchema)