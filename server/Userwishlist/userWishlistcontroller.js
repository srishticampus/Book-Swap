const express=require("express")
// const wishlistschema=require('./userWishlistschema')
const userWishlistschema = require("./userWishlistschema")

const wishlist= async (req,res)=>{
    let flag=0
    await userWishlistschema.find({userid:req.body.userid,
        bookid:req.body.bookid}).then(data=>{
            if(data.length>0)
            flag=1
        })
    let userwishlist=new userWishlistschema({
        userid:req.body.userid,
        bookid:req.body.bookid

    })
    if(flag==0){
  await  userwishlist.save()
    .then(response=>{
        res.json({
            data:response,
            status:200
        })
    })
    .catch(err=>{
        res.json({
            msg:"error",
            status:500
        })
    })
}
else{
    res.json({
        msg:"Book already in your WishList !!",
        status:500
    })
}
}

const viewbookwishlist=(req,res)=>{
    // console.log(req.params.id);
    userWishlistschema.find({userid:req.params.id}).populate('bookid')
    .exec()
    .then(response=>{
        if (response.length === 0) {
            res.status(404).json({
                msg: "No data found ."
            });
        } else {
            res.json({
                data: response
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
const deletewishlist=(req,res)=>{
    userWishlistschema.findByIdAndDelete({_id:req.params.id})
    .then(response=>{
        res.json({
            msg:response,
            status:200
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            msg:"err",
            status:500

        })
    })


}

module.exports={wishlist,viewbookwishlist,deletewishlist}