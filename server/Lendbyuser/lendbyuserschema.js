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
    }
})
module.exports= mongoose.model('lendbyuser',lendschema)