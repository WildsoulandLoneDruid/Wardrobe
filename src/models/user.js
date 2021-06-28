//import wardrobeSchema from './wardrobe';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
}

const emailData = {
    primaryEmail: requiredString,
    secondaryEmail: { type: String, default: null },
}

const securityData = {
    password: { type: String },
    securityQuestion1: { type: String, default: null },
    securityQuestion1Answer: { type: String, default: null },
    securityQuestion2: { type: String, default: null },
    securityQuestion2Answer: { type: String, default: null },
    securityQuestion3: { type: String, default: null },
    securityQuestion3Answer: { type: Number, default: null },
}

const articleData = {
    RFID: { type: String, required: true, hide: true, defualt: null },
    picture: { type: Number, default: 0 },
    timesUsed: { type: Number, default: 0 },
    color: { type: String, default: null },
    type: { type: String, required: true, enum: ['Shirt', 'Pants'] },
}
const wardrobeData = {
    location: { type: String, default: null },
    totalNumberOfArticles: { type: Number, default: 0 },
    totalNumberOfShirts: { type: Number, default: 0 },
    totalNumberOfPants: { type: Number, default: 0 },
    articleData: [articleData],
}
const usersSchema = new Schema({
    fullName: requiredString, // String is shorthand for {type: String}
    email: [emailData],
    security: [securityData],
    wardrobe: [wardrobeData],
    //timestamps: true,
});

module.exports = mongoose.model('users', usersSchema);