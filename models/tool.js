const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    total: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: Array, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Tool', toolSchema)