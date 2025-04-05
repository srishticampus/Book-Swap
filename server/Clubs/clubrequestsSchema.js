
const mongoose = require('mongoose');
const user = require("../User/userSchema");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"clubs",
    required:true

  },
  status: {
    type: String,
    default: 'pending',
  },
 
});

const ClubRequest = mongoose.model('ClubRequest', requestSchema);

module.exports = ClubRequest;
