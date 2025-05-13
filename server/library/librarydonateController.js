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
    libraryDonateSchema.find({ _id: req.params.id }).exec()
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
module.exports = {
    addBookToLibrary,
    upload,
    viewLibraryBooks, 
    viewAllDonatedBooksByAdmin
};
