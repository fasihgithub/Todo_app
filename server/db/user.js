const mongoose = require('mongoose')

const user = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
})

module.exports = mongoose.model('user', user, 'user')