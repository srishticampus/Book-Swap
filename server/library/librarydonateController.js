const express = require("express");
const libraryDonateSchema = require('./librarydonateschema');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image');

const addBookToLibrary = (req, res) => {
    console.log(req.body.libraryid);

    let image = req.file.filename;

    let donation = new libraryDonateSchema({
        bookname: req.body.bookname,
        authername: req.body.authername,
        publisher: req.body.publisher,
        publisheryear: req.body.publisheryear,
        libraryid: req.body.libraryid,
        count: req.body.count,
        image: image
    });

    donation.save()
        .then((response) => {
            console.log(response);
            res.json({
                status: 200,
                msg: "Book donation saved successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Error saving book donation",
                error: err
            });
        });
};

const viewLibraryBooks = (req, res) => {
    libraryDonateSchema.find({ libraryid: req.params.id })
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Books fetched successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No books found for this library"
                });
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Error fetching books",
                error: err
            });
        });
};
const viewAllDonatedBooksByAdmin = (req, res) => {
    libraryDonateSchema.find().exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "All donated books fetched successfully",
                data: data
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Error fetching donated books",
                error: err
            });
        });
};

const lendBookFromLibrary = (req, res) => {
    const bookId = req.params.bookid;
    const { userId, returnDate } = req.body;

    libraryDonateSchema.findById(bookId)
        .then(book => {
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
        .then(updatedBook => {
            res.json({
                status: 200,
                msg: "Book lent successfully",
                data: updatedBook
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Error lending book",
                error: err
            });
        });
};
const returnLibraryBook = (req, res) => {
    const bookId = req.params.bookid;

    libraryDonateSchema.findById(bookId)
        .then(book => {
            if (!book || !book.isLent) {
                return res.json({ status: 400, msg: "Book is not lent or doesn't exist" });
            }

            book.isLent = false;
            book.lentTo = null;
            book.lentDate = null;
            book.returnDate = null;

            return book.save();
        })
        .then(updatedBook => {
            res.json({
                status: 200,
                msg: "Book returned successfully",
                data: updatedBook
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Error returning book",
                error: err
            });
        });
};

module.exports = {
    addBookToLibrary,
    upload,
    viewLibraryBooks, 
    viewAllDonatedBooksByAdmin,lendBookFromLibrary,returnLibraryBook
};
