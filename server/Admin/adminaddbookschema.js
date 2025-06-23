const mongoose = require("mongoose");

const adminaddbookschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    require: true,
  },
  bookformat: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  isbn: {
    type: String,
    require: true,
  },
  isbn13: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  reviews: {
    type: Number,
    require: true,
  },
  totalratings: {
    type: Number,
    require: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  libraryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "libraries",
    default: null,
  },
  count: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("adminaddbook", adminaddbookschema);
