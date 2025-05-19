const mongoose = require("mongoose");

const libraryDonateSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    authername: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publisheryear: {
        type: String,
        required: true
    },
    libraryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'libraries',
         required: true
      },
    count: {
        type: String,
        default: 1
    },
    image: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('librarydonate', libraryDonateSchema);
