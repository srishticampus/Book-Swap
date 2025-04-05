const express = require("express");
const clubSchema = require("./clubSchema");
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
     
   \n
    Link : http://localhost:3000/club_forgotpswdafter?id=${userEmail}`,
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

const addclubs = (req, res) => {
  let image = req.file.filename;
  let clubs = new clubSchema({
    clubname: req.body.clubname,
    street: req.body.street,
    city: req.body.city,
    district: req.body.district,
    state: req.body.state,
    regno: req.body.regno,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    // confirmpassword: req.body.confirmpassword,
    pincode: req.body.pincode,
    image: image,
  });

  clubs
    .save()
    .then((response) => {
      console.log(response);
      res.json({
        status: 200,
        msg: "saved",
      });
    })
    .catch((err) => {
      if(err.code==11000){
        res.json({
          status: 409,
          msg: "Email Id Already Registered",
          
        });
      }
      else{
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
      });}
    });
};

// club forgot password
const clubforgotPasswordreq = (req, res) => {
  clubSchema
    .findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data == null) {
        res.json({
          status: 500,
          msg: "club not Found",
        });
      } else {
        testMail(req.body.email);
        res.json({
          status: 200,
          msg: "Mail Sent",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Error Occured",
      });
    });
};

const clubforgotPassword = (req, res) => {
  clubSchema
    .findOne({ email: req.body.email })
    .exec()

    .then((data) => {
      console.log(data);
      if (data == null) {
        res.json({
          status: 500,
          msg: "club not Found",
        });
      } else {
        clubSchema
          .findOneAndUpdate(
            { email: req.body.email },
            {
              password: req.body.password,
            }
          )
          .exec()
          .then((data) => {
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

  console.log("Auth Header:", authHeader);

  if (authHeader === undefined) {
    next();
  }

  let token = authHeader.split(" ")[1];

  console.log("Token:", token);

  jwt.verify(token, "secret_key", function (err, decoded) {
    if (err) {
      console.log("Token Verification Error:", err);
      return res.status(500).send({ error: "Authorization failed" });
    } else {
      next();
    }
  });
}

const clubLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const club = await clubSchema.findOne({ email: email });

    if (club) {
      if (club.password === password) {
        const token = jwt.sign(
          { email: club.email, password: club.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: club._id });
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

const viewClubbyid = (req, res) => {
  // console.log(req.headers.authorization);
  // const datas=verifyToken(req,res)
  // console.log(datas);
  clubSchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      // emps.data;
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const clubEditbyid = (req, res) => {
  clubSchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        clubname: req.body.clubname,
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
    .then((data1) => {
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

const getClubs = async (req, res) => {
  const clublist = await clubSchema
    .find()
    .then((clublist) => res.json(clublist))
    .catch((err) => res.json(err));
};

const removeClub = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const club = await clubSchema.deleteOne({ _id: id });
  try {
    console.log(club);
    res.status(201).json(club);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// send request

const requestSend = async (req, res) => {
  try {
    const { userId, clubId } = req.body;

    const user = await userSchema.findById(userId);

    const club = await clubSchema.findById(clubId);

    if (user && club) {
      const requestDetails = {
        user: user,
        status: "pending",
      };
      console.log(requestDetails);
      club.requests.push(requestDetails);

      await club.save();

      res.status(200).json({ message: "Request sent successfully!" });
    } else {
      res.status(404).json({ message: "User or Club not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// get request

const clubNotification=async (req, res) => {
  const clubnotification = await clubSchema
    .find()
    .then((clubnotification) => res.json(clubnotification))
    .catch((err) => res.json(err));
};

module.exports = {
  addclubs,
  upload,
  verifyToken,
  clubLogin,
  getClubs,
  removeClub,
  viewClubbyid,
  clubEditbyid,
  clubforgotPasswordreq,
  clubforgotPassword,
  requestSend,
  clubNotification
};
