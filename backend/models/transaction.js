const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    category:{
        type: String,
    required: true
    },
    type:{
        type: String,
    required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type: String,
    required: true
    } 
})

module.exports = mongoose.model('Transaction', transactionSchema)