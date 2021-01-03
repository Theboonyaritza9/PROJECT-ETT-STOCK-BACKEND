const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tools: { type: Object, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: Array, required: true },
    description: { type: String, required: true },
    total: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema)