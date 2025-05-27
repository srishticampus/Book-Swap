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
    userdonateschema.find({userid:req.params.id})
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
const viewalluserbook=(req,res)=>{
    userdonateschema.find({}).populate("userid")
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
const viewOtherUsersBooks = (req, res) => {
    const loggedInUserId = req.params.userid; // Assumes :userid is passed as param

    userdonateschema.find({
        userid: { $ne: loggedInUserId }, // Exclude books by the logged-in user
        isLent: false // Optional: only show books not yet lent
    })
    .populate('userid')
    .then(data => {
        if (data.length > 0) {
            res.json({
                status: 200,
                msg: "Other users' books obtained successfully",
                data: data
            });
        } else {
            res.json({
                status: 200,
                msg: "No books found from other users"
            });
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            msg: "Error retrieving data",
            Error: err
        });
    });
};
const lendBook = (req, res) => {
    const bookId = req.params.bookid;
    const userId = req.body.userid;

    userdonateschema.findById(bookId)
    .then(book => {
        if (!book) {
            return res.json({ status: 404, msg: "Book not found" });
        }
        if (book.isLent) {
            return res.json({ status: 400, msg: "Book is already lent" });
        }

        book.isLent = true;
        book.lentTo = userId;

        return book.save();
    })
    .then(updated => {
        res.json({
            status: 200,
            msg: "Book successfully lent",
            data: updated
        });
    })
    .catch(err => {
        res.json({
            status: 500,
            msg: "Lending failed",
            Error: err
        });
    });
};

module.exports={addbook,upload,viewuserbook,viewalluserbook,viewOtherUsersBooks,lendBook}