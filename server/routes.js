const express = require("express");
const router = express.Router();
const users=require('./User/userController')


const Clubs = require("./Clubs/clubController");


// const request=require("./Clubs/clubController")

// const users = require("./User/userController");

router.post("/addclubs", Clubs.upload, Clubs.addclubs);
router.post("/clublogin",Clubs.clubLogin)
router.post("/viewClubbyid/:id",Clubs.viewClubbyid)
router.post("/clubeditbyid/:id",Clubs.upload,Clubs.clubEditbyid)

router.get("/admin_club",Clubs.getClubs)
router.delete('/admin_club/:id',Clubs.removeClub)

// router.post("/adduser", users.upload, users.adduser);
// router.post("/userforgotpswd", users.forgotPassword);


router.post("/userlogin", users.userLogin);
router.post('/adduser',users.upload,users.adduser)
router.post('/userforgotpassword',users.forgotPassword)
router.post('/forgotPasswordreq',users.forgotPasswordreq)
router.post('/viewUserById/:id',users.viewUserById)
router.post('/viewAllUsers',users.viewAllUsers)
router.post('/editUserById/:id',users.upload,users.editUserById)
router.post('/deleteUser/:id',users.deleteUser)

//user Donate Book
const userdonate=require('./User/userdonateController')
router.post('/donatebook',userdonate.upload,userdonate.addbook)
router.post('/viewuserdonatebook/:id',userdonate.viewuserbook)

//clubdonatebook
const clubdonate=require('./Clubs/clubdonateController')
router.post('/clubdonate',clubdonate.upload,clubdonate.addbookclub)
router.post('/viewclubdonatebook',clubdonate.viewclubbook)


// club forgot password
router.post('/clubforgotpassword',Clubs.clubforgotPassword)
router.post('/clubforgotPasswordreq/:id',Clubs.clubforgotPasswordreq)

// admin Addbook
const adminaddbook=require('./Admin/adminaddbookController')
router.post('/adminaddbook',adminaddbook.upload,adminaddbook.addbookadmin)
router.post('/viewAllBooks/:id',adminaddbook.viewAllBooks1)
router.post('/deleteBook/:id',adminaddbook.deleteBook)
router.post('/admineditbook/:id',adminaddbook.upload,adminaddbook.admineditbook)
router.post('/adminviewbookone/:id', adminaddbook.adminviewbookone)//
router.post('/viewuserbook/:id',adminaddbook.viewuserbook)
router.post('/viewclubbook/:id',adminaddbook.viewclubbook)
router.post('/viewallbookforclub',adminaddbook.viewallbookforclub)
router.post('/viewDonationsForAdmin',adminaddbook.viewDonationsForAdmin)

//useraddwishlist
const useraddwishlist=require("./Userwishlist/userWishlistcontroller")
router.post('/userwishlist',useraddwishlist.wishlist)
router.post('/bookviewwishlist/:id',useraddwishlist.viewbookwishlist)
router.post('/deletewishlist/:id',useraddwishlist.deletewishlist)

const requestController = require('./Clubs/clubrequestController');

router.post('/sendrequest', requestController.sendRequest);
router.post('/requests/:clubId', requestController.getRequestsForClub);
router.get('/userDetails/:userId',requestController.getRequestuser)
router.get('/userviewclub/:id',requestController.userview)
router.post('/getAcceptedRequestForClub/:clubId',requestController.getAcceptedRequestForClub)
router.post('/deleteClubMember/:id',requestController.deleteClubMember)


router.put('/acceptRequest/:requestId',requestController.acceptRequest)
router.put('/rejectRequest/:requestId',requestController.rejectRequest)

const lendbook=require("./Lendbyuser/lendbyusercontroller")
router.post('/lendbyuser',lendbook.lend)
router.post('/lendedBooksByUser/:id',lendbook.lendedBooksByUser)
router.post('/calcFineForUser/:id',lendbook.calcFineForUser)
router.post('/returnbook/:id',lendbook.returnbackbook)

const exchange=require('./User/userExchangeController')
router.post('/exchangebook',exchange.userExchangebook)
router.get('/exchangerequests/:userid',exchange.getuserExchangebook)


router.put('/acceptExchangeRequest/:exchangeId',exchange.acceptExchangeIdRequest)
router.put('/rejectExchangeRequest/:exchangeId',exchange.rejectExchangeIdRequest)

router.post('/displayexchangerequests',exchange.displayExchangeRequest)

module.exports=router
