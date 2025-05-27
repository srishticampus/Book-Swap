const express = require("express");
const librarySchema = require("./librarySchema");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userSchema = require("../User/userSchema");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bookexchange205@gmail.com",
    pass: "jsyu cwze ymro cfhj",
  },
});

const testMail = (userEmail) => {
  const mailOptions = {
    from: "bookexchange205@gmail.com",
    to: userEmail,
    subject: "User Verification By BookShop",
    text: `Please use the Link to Reset Your Password on BookShop.com \n
    Link : http://localhost:3000/library_forgotpswdafter?id=${userEmail}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const upload = multer({ storage: storage }).single("image");

const addLibrary = (req, res) => {
  let image = req.file;
  let library = new librarySchema({
    libraryname: req.body.libraryname,
    street: req.body.street,
    city: req.body.city,
    district: req.body.district,
    state: req.body.state,
    regno: req.body.regno,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    pincode: req.body.pincode,
    image: image,
  });

  library
    .save()
    .then((response) => {
      console.log(response);
      res.json({
        status: 200,
        msg: "saved",
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "Email Id Already Registered",
        });
      } else {
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });
      }
    });
};

// const libraryForgotPasswordReq = (req, res) => {
//   librarySchema
//     .findOne({ email: req.body.email })
//     .exec()
//     .then((data) => {
//       if (data == null) {
//         res.json({
//           status: 500,
//           msg: "Library not Found",
//         });
//       } else {
//         testMail(req.body.email);
//         res.json({
//           status: 200,
//           msg: "Mail Sent",
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "Error Occurred",
//       });
//     });
// };

const libraryForgotPassword = (req, res) => {
  librarySchema
    .findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data == null) {
        res.json({
          status: 500,
          msg: "Library not Found",
        });
      } else {
        librarySchema
          .findOneAndUpdate(
            { email: req.body.email },
            {
              password: req.body.password,
            }
          )
          .exec()
          .then(() => {
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
      }
    });
};

function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    next();
  }

  let token = authHeader.split(" ")[1];

  jwt.verify(token, "secret_key", function (err, decoded) {
    if (err) {
      return res.status(500).send({ error: "Authorization failed" });
    } else {
      next();
    }
  });
}

const libraryLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const library = await librarySchema.findOne({ email: email });

    if (library) {
      if (library.password === password) {
        const token = jwt.sign(
          { email: library.email, password: library.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res.status(200).json({ message: "Login successful", token, id: library._id });
      } else {
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewLibraryById = (req, res) => {
  librarySchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const editLibraryById = (req, res) => {
  librarySchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        libraryname: req.body.libraryname,
        street: req.body.street,
        city: req.body.city,
        district: req.body.district,
        state: req.body.state,
        regno: req.body.regno,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.password,
        pincode: req.body.pincode,
        image: req.file,
      }
    )
    .exec()
    .then(() => {
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

const getLibraries = async (req, res) => {
  await librarySchema
    .find()
    .then((list) => res.json(list))
    .catch((err) => res.json(err));
};

const removeLibrary = async (req, res) => {
  const id = req.params.id;
  const library = await librarySchema.deleteOne({ _id: id });
  try {
    res.status(201).json(library);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const libraryNotification = async (req, res) => {
  await librarySchema
    .find()
    .then((notifications) => res.json(notifications))
    .catch((err) => res.json(err));
};

module.exports = {
  addLibrary,
  upload,
  verifyToken,
  libraryLogin,
  getLibraries,
  removeLibrary,
  viewLibraryById,
  editLibraryById,
  libraryForgotPassword,
  libraryNotification,
};
  // libraryForgotPasswordReq,
