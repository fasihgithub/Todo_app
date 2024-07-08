const mongoose = require('mongoose')
const User = require('./user')
require('./config')

const Schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    todo : {
        type: String
    },
})

module.exports = mongoose.model('works', Schema, 'works')