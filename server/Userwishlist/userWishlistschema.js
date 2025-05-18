const mongoose=require("mongoose")

const userwishlistschema=mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:'adduser'},
    bookid:{type:mongoose.Schema.Types.ObjectId,
        ref:'adminaddbook'},
    
})

module.exports = mongoose.model('userwishlistschema', userwishlistschema)