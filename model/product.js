const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Products", ProductSchema)