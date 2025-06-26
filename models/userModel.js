import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

mongoose.connect('mongodb://localhost:27017/UserTour')
    .then(() => console.log('Conneted to DB'))
    .catch((err) => console.log('Error while conneted to DB'))

const UserSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 8,
        select: false
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

UserSchema.pre('save',async function(next)  {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined;
    next()
})

UserSchema.methods.correctPassword = async function (
    condidatePassword,
    userPassword){
    return await bcrypt.compare(condidatePassword,userPassword)

}

const User = mongoose.model('UserTour', UserSchema)
export default User;