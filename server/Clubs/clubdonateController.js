const express=require("express")
const clubdonateschema=require('./clubdonateschema')
const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage}).single('image')
const addbookclub=((req,res)=>{
    console.log(req.body.clubid);

    let image=req.file.filename;
    let donate=new clubdonateschema({
        bookname:req.body.bookname,
        authername:req.body.authername,
        publisher:req.body.publisher,
        publisheryear:req.body.publisheryear,
        clubid:req.body.clubid,
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
const viewclubbook=(req,res)=>{
    clubdonateschema.find({clubid:req.params.id}).exec()
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
module.exports={addbookclub,upload,viewclubbook}
