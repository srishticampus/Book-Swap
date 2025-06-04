const mongoose=require('mongoose')
const lendschema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
        },
    bookid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adminaddbook',
        required:true

    },
    date:{
        type:Date,
    },
    returnDate: {
    type: Date,
    default: null, // null implies pending
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
})
module.exports= mongoose.model('lendbyuser',lendschema)