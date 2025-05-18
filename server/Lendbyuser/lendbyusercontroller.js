const express=require('express')
const lendschema=require("./lendbyuserschema");
const adminaddbookschema = require('../Admin/adminaddbookschema');
const lendbyuserschema = require('./lendbyuserschema');

const date=new Date()


const lend=async(req,res)=>{
  console.log(req.body.userid);
let flag=0,count=0
  await lendschema.find({ userid:req.body.userid,bookid:req.body.bookid}).then(data=>{
    if(data.length>0){
flag=1
    }
  }).catch(err=>{
console.log(err);
  })
  
    let lenduser=new lendschema({
        userid:req.body.userid,
        bookid:req.body.bookid,
        date:date
    })
    if(flag==0){
      await adminaddbookschema.findById({_id:req.body.bookid}).then(data=>{
        count=(data.count-1)
        
      }).catch(err=>{
    console.log(err);
      })
      await adminaddbookschema.findByIdAndUpdate({_id:req.body.bookid},{count:count}).then(data=>{
        console.log("count updated");
        
      }).catch(err=>{
    console.log(err);
      })





  await lenduser
    .save()
    .then( (response) => {
      console.log(response);
      res.json({
        status: 200,
        msg: "saved",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
      });
    });
  }
  else{
    res.json({
      status: 500,
      msg: "You have already lent the same Book !!",
    });
  }

}

const lendedBooksByUser=(req,res)=>{
  console.log(req.params.id);
  lendschema.find({userid:req.params.id}).populate('bookid')
  .exec()
  .then(response=>{
      if (response.length === 0) {
          res.status(404).json({
              msg: "No data found ."
          });
      } else {
          res.json({
              data: response,
              status:200
          });
      }
  })
  .catch(err=>{
      console.log(err);
      res.json({
          msg:"err"
          
      })
  })
}
const calcFineForUser=async(req,res)=>{
  let currDate=new Date()
  let lendDate=new Date()
  let fine=0
  let expiry=new Date()
  await lendschema.findById({_id:req.params.id}).exec().then(data=>{
  lendDate=data.date
  console.log(lendDate);
  expiry.setDate(lendDate.getDate()+10)
  console.log("ok",expiry);
  const timeDifference = (expiry.getTime() - currDate.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
console.log("diff",daysDifference);
if(daysDifference<0)
fine=daysDifference*10
    res.json({
      status:200,
      data1:Math.abs(fine),
      msg:"data obtained"
    })
  })
  .catch(err=>{
    res.send(err)
  })
}

const returnbackbook=(req,res)=>{
  lendschema.findByIdAndDelete({_id:req.params.id}).exec()
  .then(response=>{
    console.log(response);
    if (response.length === 0) {
        res.status(404).json({
            msg: "No data found ."
        });
    } else {
      adminaddbookschema.findByIdAndUpdate({_id:response.bookid },{ $inc: { count: 1 } })
      .then(result=>{
        res.json({
            data: response,
            msg:"deleted sucessfully",
            status:200
        });
      });
    }
})
.catch(err=>{
    console.log(err);
    res.json({
        msg:"err"
        
    })
})

}

module.exports={lend, lendedBooksByUser,calcFineForUser,returnbackbook}