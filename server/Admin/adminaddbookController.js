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

// const addbookadmin = (req, res) => {
//   let image = req.file.filename;

//   let addbook = new adminaddbookschema({
//     bookname: req.body.bookname,
//     authername: req.body.authername,
//     publisher: req.body.publisher,
//     publisheryear: req.body.publisheryear,
//     userid: req.body.userid,
//     libraryid: req.body.libraryid,
//     image: image,
//     count: req.body.count,
//     date: date,
//   });
//   addbook
//     .save()
//     .then((response) => {
//       res.json({
//         status: 200,
//         msg: "saved",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "error",
//       });
//     });
// };

const fs = require("fs");
const path = require("path");

const loadAdminBookData = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "/adminbookdata.txt");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const books = JSON.parse(rawData);

    const formattedBooks = books.map((book) => ({
      ...book,
      date: new Date(),
    }));

    await adminaddbookschema.insertMany(formattedBooks);

    res
      .status(200)
      .json({ success: true, message: "Books imported successfully" });
  } catch (err) {
    console.error("Error loading book data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
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
    // console.log(`Book ID: ${bookIdString},  Wishlisted: ${isWishlisted}`);
    return {
      ...book._doc,
      wishlisted: isWishlisted,
    };
  });
  // console.log(booksWithWishlistStatus);
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
  adminaddbookschema.find({ libraryid: req.params.id }).exec();
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

// const viewAllBooks1 = async (req, res) => {
//   let arr1 = [],
//     arr2 = [],
//     final = [];

//   await userWishlistschema
//     .find({ userid: req.params.id })
//     .then((data) => {
//       data.map((id) => {
//         arr1.push(id.bookid);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // console.log("arr1", arr1);

//   await adminaddbookschema
//     .find({ _id: { $in: arr1 } })
//     .exec()
//     .then((data) => {
//       if (data.length > 0) {
//         // console.log("in", data);
//         data.map((x) => {
//           if (x.count > 0) {
//             let book = {
//               _id: "",
//               bookname: "",
//               authername: "",
//               publisher: "",
//               publisheryear: "",
//               userid: null,
//               libraryid: null,
//               image: null,
//               count: 0,
//               bookpdf:null,
//               date: null,
//               wishlisted: true,
//               rating: 0,
//             };
//             book.bookname = x.bookname;
//             book.authername = x.authername;
//             book.wishlisted = false;
//             book._id = x._id;
//             book.publisher = x.publisher;

//             book.publisheryear = x.publisheryear;
//             book.wishlisted = true;
//             book.userid = x.userid;
//             book.image = x.image;
//             book.libraryid = x.libraryid;
//             book.count = x.count;
//             book.date = x.date;
//             book.rating = x.rating;

//             arr2.push(book);
//           }
//         });
//         // console.log(arr2);
//       } else {
//         //   res.json({
//         //     status:200,
//         //     msg:"No Data obtained "
//         // })
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       // res.json({
//       //     status:500,
//       //     msg:"Data not Inserted",
//       //     Error:err
//       // })
//     });
//   await adminaddbookschema
//     .find({ _id: { $nin: arr1 } })
//     .exec()
//     .then((data) => {
//       if (data.length > 0) {
//         // console.log(data);

//         data.map((x) => {
//           if (x.count > 0) {
//             let book = {
//               _id: "",
//               bookname: "",
//               authername: "",
//               publisher: "",
//               publisheryear: "",
//               userid: null,
//               libraryid: null,
//               image: null,
//               count: 0,
//               date: null,
//               wishlisted: false,
//               rating: 0,
//             };
//             book.bookname = x.bookname;
//             book.authername = x.authername;
//             book.wishlisted = false;
//             book._id = x._id;
//             book.publisher = x.publisher;

//             book.publisheryear = x.publisheryear;

//             book.userid = x.userid;
//             book.image = x.image;
//             book.libraryid = x.libraryid;
//             book.count = x.count;
//             book.date = x.date;
//             book.rating = x.rating;

//             arr2.push(book);
//           }
//         });
//       } else {
//         //   res.json({
//         //     status:200,
//         //     msg:"No Data obtained "
//         // })
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       // res.json({
//       //     status:500,
//       //     msg:"Data not Inserted",
//       //     Error:err
//       // })
//     });

//   if (arr2.length > 0) {
//     res.json({
//       status: 200,
//       data: arr2,
//       msg: "data obtained",
//     });
//   } else
//     res.json({
//       status: 200,
//       data: arr2,
//       msg: "no data obtained",
//     });
// };

const viewAllBooks1 = async (req, res) => {
  try {
    const arr2 = [];

    // Step 1: Get list of wishlisted book IDs for the user
    const wishlistEntries = await userWishlistschema.find({ userid: req.params.id });
    const wishlistedBookIds = wishlistEntries.map((entry) => entry.bookid.toString());

    // Step 2: Get books that are in the wishlist
    const wishlistedBooks = await adminaddbookschema.find({ _id: { $in: wishlistedBookIds } });

    wishlistedBooks.forEach((bookDoc) => {
      if (bookDoc.count > 0) {
        arr2.push({
          ...bookDoc._doc,
          wishlisted: true,
        });
      }
    });

    // Step 3: Get books that are NOT in the wishlist
    const nonWishlistedBooks = await adminaddbookschema.find({ _id: { $nin: wishlistedBookIds } });

    nonWishlistedBooks.forEach((bookDoc) => {
      if (bookDoc.count > 0) {
        arr2.push({
          ...bookDoc._doc,
          wishlisted: false,
        });
      }
    });

    // Step 4: Return result
    res.json({
      status: 200,
      data: arr2,
      msg: arr2.length > 0 ? "data obtained" : "no data obtained",
    });
  } catch (err) {
    console.error("Error in viewAllBooks1:", err);
    res.status(500).json({
      status: 500,
      msg: "Server error while retrieving book data",
      error: err.message,
    });
  }
};

const viewDonationsForAdmin = async (req, res) => {
  let arr = [];
  await adminaddbookschema
    .find({})
    .populate("userid")
    .populate("libraryid")
    .then((data) => {
      data.map((x) => {
        // console.log(x.userid);
        if (x.userid != null || x.libraryid != null) {
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
  } else {
    rating = req.body.rating;
  }
  // console.log("rating",rating);
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
  loadAdminBookData,
  viewallbookforclub,
  upload,
  viewAllBooks1,
  deleteBook,
  admineditbook,
  adminviewbookone,
  viewuserbook,
  viewclubbook,
  viewDonationsForAdmin,
  addRating,
};
