const express = require("express");
const adminaddbookschema = require("./adminaddbookschema");

const multer = require("multer");
const userWishlistschema = require("../Userwishlist/userWishlistschema");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const date = Date.now();
const upload = multer({ storage: storage }).single("image");

const addbookadmin = (req, res) => {
  let image = req.file.filename;

  let addbook = new adminaddbookschema({
    bookname: req.body.bookname,
    authername: req.body.authername,
    publisher: req.body.publisher,
    publisheryear: req.body.publisheryear,
    userid: req.body.userid,
    clubid: req.body.clubid,
    image: image,
    count: req.body.count,
    date: date,
  });
  addbook
    .save()
    .then((response) => {
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
};

const viewallbookforclub = (req, res) => {
  adminaddbookschema
    .find({})
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        msg: "err",
      });
    });
};

//View all books using userid for wishlist

const viewAllBooks = async (req, res) => {
  let arr1 = [],
    arr2 = [],
    final = [];
  await userWishlistschema
    .find({ userid: req.params.id })
    .then((data) => {
      data.map((id) => {
        arr1.push(id.bookid);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  await adminaddbookschema
    .find({})
    .exec()
    .then((data) => {
      if (data.length > 0) {
        data.map((x) => {
          arr2.push(x);
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });

  // arr2.map(x=>{
  //     console.log(y);
  //     if(y==x._id){
  //       console.log(x._id);
  //       arr3.push(x._id)
  //     }

  //   })
  // })
  // const wishlistedBookIds = new Set(arr1.map(item => item));

  // // Add wishlisted property to each book
  // const booksWithWishlistInfo = arr2.map(book => ({
  //   ...book.toObject(),
  //   wishlisted: wishlistedBookIds.has(book._id.toString())
  // }));
  // console.log(booksWithWishlistInfo);

  const wishlistedBookIds = new Set(arr1.map((item) => item));

  // Add wishlisted property to each book
  // const booksWithWishlistInfo = arr2.map(book => {
  //   console.log(book._id);
  //   console.log(wishlistedBookIds);
  //   console.log(wishlistedBookIds.has(book._id));
  // if(wishlistedBookIds.has(book._id.toString()))
  // console.log("true");
  // else
  // console.log("false");
  // });
  // console.log(booksWithWishlistInfo);
  const booksWithWishlistStatus = arr2.map((book) => {
    const bookIdString = book._id.toString();
    const isWishlisted = arr1.includes(bookIdString);
    console.log(`Book ID: ${bookIdString},  Wishlisted: ${isWishlisted}`);
    return {
      ...book._doc,
      wishlisted: isWishlisted,
    };
  });
  console.log(booksWithWishlistStatus);
};
const viewuserbook = (req, res) => {
  adminaddbookschema
    .find({ userid: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
const viewclubbook = (req, res) => {
  adminaddbookschema.find({ clubid: req.params.id }).exec();
  adminaddbookschema
    .find({ userid: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const deleteBook = (req, res) => {
  adminaddbookschema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Deleted Doc",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "err",
      });
      console.log(err);
    });
};
const adminviewbookone = (req, res) => {
  adminaddbookschema
    .findOne({ _id: req.params.id })
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        data: response,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "err",
      });
      console.log(err);
    });
};
const admineditbook = (req, res) => {
  adminaddbookschema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        bookname: req.body.bookname,
        authername: req.body.authername,
        publisher: req.body.publisher,
        publisheryear: req.body.publisheryear,
        image: req.file.filename,
      }
    )
    .exec()
    .then((data) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

//test

const viewAllBooks1 = async (req, res) => {
  let arr1 = [],
    arr2 = [],
    final = [];

  await userWishlistschema
    .find({ userid: req.params.id })
    .then((data) => {
      data.map((id) => {
        arr1.push(id.bookid);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("arr1", arr1);

  await adminaddbookschema
    .find({ _id: { $in: arr1 } })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        console.log("in", data);
        data.map((x) => {
          if (x.count > 0) {
            let book = {
              _id: "",
              bookname: "",
              authername: "",
              publisher: "",
              publisheryear: "",
              userid: null,
              clubid: null,
              image: null,
              count: 0,
              date: null,
              wishlisted: true,
              rating:0
            };
            book.bookname = x.bookname;
            book.authername = x.authername;
            book.wishlisted = false;
            book._id = x._id;
            book.publisher = x.publisher;

            book.publisheryear = x.publisheryear;
            book.wishlisted = true;
            book.userid = x.userid;
            book.image = x.image;
            book.clubid = x.clubid;
            book.count = x.count;
            book.date = x.date;
            book.rating = x.rating;

            arr2.push(book);
          }
        });
        // console.log(arr2);
      } else {
        //   res.json({
        //     status:200,
        //     msg:"No Data obtained "
        // })
      }
    })
    .catch((err) => {
      console.log(err);
      // res.json({
      //     status:500,
      //     msg:"Data not Inserted",
      //     Error:err
      // })
    });
  await adminaddbookschema
    .find({ _id: { $nin: arr1 } })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        // console.log(data);

        data.map((x) => {
          if (x.count > 0) {
            let book = {
              _id: "",
              bookname: "",
              authername: "",
              publisher: "",
              publisheryear: "",
              userid: null,
              clubid: null,
              image: null,
              count: 0,
              date: null,
              wishlisted: false,
              rating:0
            };
            book.bookname = x.bookname;
            book.authername = x.authername;
            book.wishlisted = false;
            book._id = x._id;
            book.publisher = x.publisher;

            book.publisheryear = x.publisheryear;

            book.userid = x.userid;
            book.image = x.image;
            book.clubid = x.clubid;
            book.count = x.count;
            book.date = x.date;
            book.rating = x.rating;

            arr2.push(book);
          }
        });
      } else {
        //   res.json({
        //     status:200,
        //     msg:"No Data obtained "
        // })
      }
    })
    .catch((err) => {
      console.log(err);
      // res.json({
      //     status:500,
      //     msg:"Data not Inserted",
      //     Error:err
      // })
    });

  if (arr2.length > 0) {
    res.json({
      status: 200,
      data: arr2,
      msg: "data obtained",
    });
  } else
    res.json({
      status: 200,
      data: arr2,
      msg: "no data obtained",
    });
};

const viewDonationsForAdmin = async (req, res) => {
  let arr = [];
  await adminaddbookschema
    .find({})
    .populate("userid")
    .populate("clubid")
    .then((data) => {
      data.map((x) => {
        console.log(x.userid);
        if (x.userid != null || x.clubid != null) {
          arr.push(x);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  if (arr.length > 0) {
    res.json({
      status: 200,
      data: arr,
    });
  } else {
    res.json({
      status: 200,
      data: null,
    });
  }
};

// ad rating for book
const addRating = async (req, res) => {
  let rating = 0;
  await adminaddbookschema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
    })
    .catch((err) => {
      console.log(err);
    });
  if (rating > 0) {
    rating = parseInt((rating + req.body.rating) / 2);
  }
  else{
    rating=req.body.rating
  }
  console.log("rating",rating);
  await adminaddbookschema
    .findByIdAndUpdate({ _id: req.params.id }, { rating: rating })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Rating added",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};
module.exports = {
  addbookadmin,
  viewallbookforclub,
  upload,
  viewAllBooks1,
  deleteBook,
  admineditbook,
  adminviewbookone,
  viewuserbook,
  viewclubbook,
  viewDonationsForAdmin,addRating
};
