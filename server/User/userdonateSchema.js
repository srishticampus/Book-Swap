const mongoose = require("mongoose")

const userdonateschema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    authername: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    },
    publisheryear: {
        type: String,
        require: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    count: {
        type: Number,
        default: 1
    },

    image: {
        type: Object,
        required: true
    }
    , isLent: {
        type: Boolean,
        default: false
    },
    lentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    }

});
module.exports = mongoose.model('userdonates', userdonateschema)