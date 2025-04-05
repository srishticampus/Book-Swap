const mongoose=require("mongoose")

const clubdonateschema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
   authername: {
    type:String,
    require: true
   },
   publisher:{
    type:String,
    require:true
   },
   publisheryear:{
    type:String,
    require:true
   },
   clubid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'clubs'
   },
   count:{
    type:String,
    default:1
   },
    image: {
        type: Object,
       required: true
    }
});


module.exports = mongoose.model('clubdonate', clubdonateschema)