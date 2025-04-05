const mongoose = require("mongoose");

const userexchangeschema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  authername: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  status: {
    type: String,
    default: 'pending',
  },
  acceptedDate: {
    type: Date,
    default: null,
  },
  statusChangedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  }
});
module.exports = mongoose.model("userExchange", userexchangeschema);
