const mongoose = require('mongoose')

const pescriptionSchema = new mongoose.Schema({
    appointmentId:{
        type: String,
        require: true
    },
    userId:{
        type: String,
        require: true
    },
    patientId:{
        type: String,
        require: true
    },
    diagnosis: {
        type: String,
        require: true
    },
    test: {
        type: String,
        require: true
    },
    medicene: {
        type: String,
        require: true
    }
},{timestamps: true})

const pescriptionModel = mongoose.model('pescription',pescriptionSchema)

module.exports = pescriptionModel;