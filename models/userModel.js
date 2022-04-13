const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please Add a First Name"]
    },
    company: {
        type: String,
        require: [true, "Please Add a Company Name"]
    },
    email: {
        type: String,
        require: [true, "Please Add a Email Address"],
    },
    password: {
        type: String,
        require: [true, "Please Add a Password"]
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userModel)