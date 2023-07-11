const mongoose = require('mongoose')

const mediceneSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    medInfo: {
        type: String,
        require: true
    },
    qty: {
        type: String,
        require: true
    },
    expiryDate: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }

},{timestamps: true})

const mediceneModel = mongoose.model('medicenes',mediceneSchema)

module.exports = mediceneModel;