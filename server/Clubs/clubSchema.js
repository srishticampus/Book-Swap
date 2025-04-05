const mongoose = require("mongoose");

const clubschema=mongoose.Schema({
    clubname:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    regno:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true,

        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    // confirmpassword:{
    //     type:String,
    //     required:true
    // },
    pincode:{
        type:String,
        require:true
    },
    image:{
        type:Object,
        require:true
    }
    
})
module.exports=mongoose.model('clubs',clubschema)