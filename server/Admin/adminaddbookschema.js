const mongoose=require("mongoose")

const adminaddbookschema = mongoose.Schema({
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
    image: {
        type: Object,
       required: true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        default:null
        },
        clubid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'clubs',
            default:null
        },
        count:{
            type:Number,
            default:1
        },
        date:{
            type:Date,
            required:true
        },rating  :{
            type:Number,
            default:0
        }
});
module.exports = mongoose.model('adminaddbook', adminaddbookschema)