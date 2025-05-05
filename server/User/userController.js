const express = require("express");
const userSchema = require("./userSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer')

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
    Link : http://localhost:3000/reader_forgotpswdafter?id=${userEmail}`

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
const adduser = (req, res) => {
  let image = req.file;
  let user = new userSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    district: req.body.district,
    nationality: req.body.nationality,
    image: image,
  });

  user
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
// Forgot Pwd req done by radhul Ram
// const forgotPasswordreq = (req, res) => {
//   userSchema
//     .findOne({ email: req.body.email })
//     .exec()
//     .then((data) => {
//       if (data == null) {
//         res.json({
//           status: 500,
//           msg: "User not Found",
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
//         msg: "Error Occured",
//       });
//     });
// };
// forgotPasswordreq finished

//Login function done by Soumya on 01/11/2023
const forgotPassword = (req, res) => {
  userSchema
    .findOne({ email: req.body.email })
    .exec()

    .then((data) => {
      console.log(data);
      if (data == null) {
        res.json({
          status: 500,
          msg: "User not Found",
        });
      } else {
        userSchema
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
const userLogin = async (req,res) => {
  console.log(req.body);
  
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res.status(200).json({ message: "Login successful", token ,id:user._id});
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

const viewUserById = (req, res) => {

  userSchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
      console.log(data);
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

const editUserById = (req, res) => {
  userSchema.findByIdAndUpdate({ _id: req.params.id }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    dob: req.body.dob,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    district: req.body.district,
    nationality: req.body.nationality,
    image: req.file,
  })
    .exec().then(data1 => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      })
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}

const viewAllUsers=(req,res)=>{
  userSchema.find({}).exec()
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

const deleteUser = (req, res) => {
  userSchema
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

module.exports = {
  adduser,
  upload,
  forgotPassword,
  userLogin,
  verifyToken,
  viewUserById,
  editUserById,
  viewAllUsers,
  deleteUser
};
  // forgotPasswordreq,
