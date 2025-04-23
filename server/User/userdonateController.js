const express = require('express')
const userdonateschema=require('./userdonateSchema')
const multer = require('multer')

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage}).single('image')

const addbook=((req,res)=>{
    console.log(req.body);
    
    let image=req.file.filename;
    let donate=new userdonateschema({
        bookname:req.body.bookname,
        authername:req.body.authername,
        publisher:req.body.publisher,
        publisheryear:req.body.publisheryear,
        userid:req.body.userid,
        count:req.body.count,
        image:image
    })
    donate.save()
    .then((response)=>{
        console.log(response);
        res.json({
            status:200,
            msg:"saved"
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({
            status:500,
            msg:"error"
        })
    })
})
const viewuserbook=(req,res)=>{
    userdonateschema.find({userid:req.params.id}).exec()
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
}
module.exports={addbook,upload,viewuserbook}