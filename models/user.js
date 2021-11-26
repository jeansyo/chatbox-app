const { Schema, model } = require("mongoose");

const User =  Schema({
    _date: {
        type: Date,
        required: true,
        default: new Date().getTime()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = model("User", User)