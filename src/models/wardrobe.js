import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleData = {
    RFID: { type: String, required: true, hide: true, defualt: null },
    picture: { type: Number, default: 0 },
    timesUsed: { type: Number, default: 0 },
    color: { type: String, default: null },
    type: { type: String, required: true, default: null },
    timestamps: true,
}

const wardrobeData = {
    wardrobeID: { type: String },
    location: { type: String, default: null },
    totalNumberOfArticles: { type: Number, default: 0 },
    totalNumberOfShirts: { type: Number, default: 0 },
    totalNumberOfPants: { type: Number, default: 0 },
    articleData: [articleData],
    timestamps: true,
}


module.exports = mongoose.model('wardrobes', usersSchema);