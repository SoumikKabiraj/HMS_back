const mongoose = require('mongoose')

const buymediceneSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    medId: {
        type: String,
        require: true
    },
    medName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phno: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    orderqty: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }

},{timestamps: true})

const buymediceneModel = mongoose.model('buymedicene',buymediceneSchema)

module.exports = buymediceneModel;