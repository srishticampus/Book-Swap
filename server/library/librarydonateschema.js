const mongoose = require("mongoose");

const libraryDonateSchema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  authername: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publisheryear: {
    type: String,
    required: true,
  },
  libraryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "libraries",
    required: true,
  },
  count: {
    type: String,
    default: 1,
  },
  image: {
    type: Object,
    required: true,
  },
  bookpdf: {
    type: Object,
    required: false,
  },
  isLent: {
    type: Boolean,
    default: false,
  },
  lentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // or 'students', based on your system
    default: null,
  },
  lentDate: {
    type: Date,
    default: null,
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("librarydonate", libraryDonateSchema);
