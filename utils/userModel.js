const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isEmail')

const UserScema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please tell us your name']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    photo:String,
    password:{
        type:String,
        required:[true,"please provide a password"],
        minlength:8
    }
})

const User = mongoose.model('UserTour',UserScema)
module.exports = User;