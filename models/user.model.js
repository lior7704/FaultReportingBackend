const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    first_name: {
        type: String
    }, 
    last_name: {
        type: String
    }, 
    username: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    phone_number: {
        type: String
    }, 
    unit: {
        type: String
    }, 
    role: {
        type: String
    }
});

module.exports = mongoose.model('User', User);