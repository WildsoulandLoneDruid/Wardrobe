import wardrobeSchema from './wardrobe';
import mongoose from 'mongoose';
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
    password: { requiredString, minLength: 8, hide: true },
    securityQuestion1: { type: Number, default: 0 },
    securityQuestion1Answer: { type: Number, default: 0 },
    securityQuestion2: { type: Number, default: 0 },
    securityQuestion2Answer: { type: Number, default: 0 },
    securityQuestion3: { type: Number, default: 0 },
    securityQuestion3Answer: { type: Number, default: 0 },
}

const articleData = {
    RFID: { type: String, required: true, hide: true, defualt: null },
    picture: { type: Number, default: 0 },
    timesUsed: { type: Number, default: 0 },
    color: { type: String, default: null },
    type: { type: String, required: true, default: null },
    timestamps: true,
}

const wardrobeData = {
    articleData: [articleData],
    totalNumberOfArticles: { type: Number, default: 0 },
    totalNumberOfShirts: { type: Number, default: 0 },
    totalNumberOfPants: { type: Number, default: 0 },
}

const wardrobeSchema = {
    wardrobeNumber: { type: Number, defualt: null }, // String is shorthand for {type: String}
    location: { type: String, default: null },
    wardrobeData: [wardrobeData],
    timestamps: true,
};

const usersSchema = new Schema({
    fullName: requiredString, // String is shorthand for {type: String}
    email: [emailData],
    security: [securityData],
    timestamps: true,
    wardrobe: [wardrobeSchema],
});

module.exports = mongoose.model('users', usersSchema);