import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

mongoose.connect('mongodb://localhost:27017/UserTour')
    .then(() => console.log('Conneted to DB'))
    .catch((err) => console.log('Error while conneted to DB'))

const UserScema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'passwords are not same'
        }
    }, 

})

UserScema.pre('save', (next) => {

    if (!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined;
})

const User = mongoose.model('UserTour', UserScema)
export default User;