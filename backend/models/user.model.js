// Model. The Model component is responsible for managing the data and the business logic of the application. In the MERN stack, MongoDB is used as the database, which stores the data used in the application. The model's directory contains the database schema and the functions that interact with the database.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            min: [3,'firstname must be at least 3 characters'],
            max: 255
        },
        lastname:{
            type: String,
            // required: true,
            min: [3,'lastname must be at least 3 characters'],
            max: 255
        }
    },
    email: {
        type: String,
        required: true,
        max: 255,
        unique: true,
        min: [5,'email must be at least 5 characters']
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        select: false,
        min: 6
    },
    //user of driver to provide track to user
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function(){
    const tocken= jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return tocken;
}
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
 const userModel = mongoose.model('user', userSchema);
module.exports = userModel;