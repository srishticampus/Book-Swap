const express = require("express");
const libraryDonateSchema = require("./librarydonateschema");


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "bookpdf", maxCount: 1 },
]);

// const addBookToLibrary = (req, res) => {
//   console.log(req.body.libraryid);
//   let image = req.file;
//   let bookpdf = req.file;
//   let donation = new libraryDonateSchema({
//     bookname: req.body.bookname,
//     authername: req.body.authername,
//     publisher: req.body.publisher,
//     publisheryear: req.body.publisheryear,
//     libraryid: req.body.libraryid,
//     count: req.body.count,
//     image: image,
//     bookpdf: bookpdf,
//   });

//   donation
//     .save()
//     .then((response) => {
//       // console.log(response);
//       res.json({
//         status: 200,
//         msg: "Book donation saved successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "Error saving book donation",
//         error: err,
//       });
//     });
// };

const addBookToLibrary = (req, res) => {
  let image = req.files.image ? req.files.image[0] : null;
  let bookpdf = req.files.bookpdf ? req.files.bookpdf[0] : null;

  let donation = new libraryDonateSchema({
    bookname: req.body.bookname,
    authername: req.body.authername,
    publisher: req.body.publisher,
    publisheryear: req.body.publisheryear,
    libraryid: req.body.libraryid,
    count: req.body.count,
    image: image,
    bookpdf: bookpdf,
  });
 donation
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Book donation saved successfully",
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 500,
        msg: "Error saving book donation",
        error: err.message,
      });
    });
};

const viewLibraryBooks = (req, res) => {
  // console.log(req.params.id ,"req.params.id ");

  libraryDonateSchema
    .find({ libraryid: req.params.id })
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Books fetched successfully",
          data: data,
        });
        // console.log(data,"data");
      } else {
        res.json({
          status: 200,
          msg: "No books found for this library",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error fetching books",
        error: err,
      });
    });
};
const viewAllDonatedBooksByAdmin = (req, res) => {
  libraryDonateSchema
    .find()
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "All donated books fetched successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error fetching donated books",
        error: err,
      });
    });
};

const lendBookFromLibrary = (req, res) => {
  const bookId = req.params.bookid;
  const { userId, returnDate } = req.body;

  libraryDonateSchema
    .findById(bookId)
    .then((book) => {
      if (!book) {
        return res.json({ status: 404, msg: "Book not found" });
      }
      if (book.isLent) {
        return res.json({ status: 400, msg: "Book is already lent" });
      }

      book.isLent = true;
      book.lentTo = userId;
      book.lentDate = new Date();
      book.returnDate = returnDate ? new Date(returnDate) : null;

      return book.save();
    })
    .then((updatedBook) => {
      res.json({
        status: 200,
        msg: "Book lent successfully",
        data: updatedBook,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error lending book",
        error: err,
      });
    });
};
const returnLibraryBook = (req, res) => {
  const bookId = req.params.bookid;

  libraryDonateSchema
    .findById(bookId)
    .then((book) => {
      if (!book || !book.isLent) {
        return res.json({
          status: 400,
          msg: "Book is not lent or doesn't exist",
        });
      }

      book.isLent = false;
      book.lentTo = null;
      book.lentDate = null;
      book.returnDate = null;

      return book.save();
    })
    .then((updatedBook) => {
      res.json({
        status: 200,
        msg: "Book returned successfully",
        data: updatedBook,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error returning book",
        error: err,
      });
    });
};

const getLendedBooksByUser = (req, res) => {
  const { userId } = req.params;

  libraryDonateSchema
    .find({ lentTo: userId })
    .populate("libraryid", "name") // optional: populate library details
    .then((books) => {
      res.json({
        status: 200,
        msg: "Lended books fetched successfully for user",
        data: books,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error fetching lended books for user",
        error: err,
      });
    });
};

const getLendedBooksByLibrary = (req, res) => {
  const { libraryId } = req.params;

  libraryDonateSchema
    .find({ libraryid: libraryId, isLent: true })
    .populate("lentTo", "name email") // optional: populate user details
    .then((books) => {
      res.json({
        status: 200,
        msg: "Lended books fetched successfully for library",
        data: books,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error fetching lended books for library",
        error: err,
      });
    });
};

const getLendedBooksByAdmin = (req, res) => {
  // const { libraryId } = req.params;
  libraryDonateSchema
    .find({ isLent: true })
    .populate("lentTo", "name email") // optional: populate user details
    .then((books) => {
      res.json({
        status: 200,
        msg: "Lended books fetched successfully for library",
        data: books,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error fetching lended books for library",
        error: err,
      });
    });
};

const editLibraryBook = (req, res) => {
  const bookId = req.params.bookid;
  console.log(req.body, "book");

  // If new image uploaded, use it. Otherwise keep the old one.
  const updatedData = {
    bookname: req.body.bookname,
    authername: req.body.authername,
    publisher: req.body.publisher,
    publisheryear: req.body.publisheryear,
    count: req.body.count,
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  libraryDonateSchema
    .findByIdAndUpdate(bookId, updatedData, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.json({ status: 404, msg: "Book not found" });
      }
      res.json({
        status: 200,
        msg: "Book updated successfully",
        data: updatedBook,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error updating book",
        error: err,
      });
    });
};
const deleteLibraryBook = (req, res) => {
  const bookId = req.params.bookid;

  libraryDonateSchema
    .findByIdAndDelete(bookId)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.json({ status: 404, msg: "Book not found" });
      }
      res.json({
        status: 200,
        msg: "Book deleted successfully",
        data: deletedBook,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error deleting book",
        error: err,
      });
    });
};

module.exports = {
  addBookToLibrary,
  upload,
  viewLibraryBooks,
  viewAllDonatedBooksByAdmin,
  lendBookFromLibrary,
  returnLibraryBook,
  getLendedBooksByLibrary,
  getLendedBooksByUser,
  getLendedBooksByAdmin,
  editLibraryBook,
  deleteLibraryBook,
};

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, './upload');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).single('image');