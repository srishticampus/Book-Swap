const mongoose = require('mongoose');
const user = require("../User/userSchema");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "libraries",
    required: true
  },
  status: {
    type: String,
    default: 'pending',
  },
});

const LibraryRequest = mongoose.model('LibraryRequest', requestSchema);

module.exports = LibraryRequest;
