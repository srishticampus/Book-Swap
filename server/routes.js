const express = require("express");
const router = express.Router();
const users = require('./User/userController')




// const request=require("./Clubs/clubController")

// const users = require("./User/userController");

// router.get("/admin_club",Clubs.getClubs)
// router.delete('/admin_club/:id',Clubs.removeClub)

// router.post("/adduser", users.upload, users.adduser);
// router.post("/userforgotpswd", users.forgotPassword);


router.post("/userlogin", users.userLogin);
router.post('/adduser', users.upload, users.adduser)
router.post('/userforgotpassword', users.forgotPassword)
// router.post('/forgotPasswordreq',users.forgotPasswordreq)
router.post('/viewUserById/:id', users.viewUserById)
router.post('/viewAllUsers', users.viewAllUsers)
router.post('/editUserById/:id', users.upload, users.editUserById)
router.post('/deleteUser/:id', users.deleteUser)

//user Donate Book
const userdonate = require('./User/userdonateController')
router.post('/donatebook', userdonate.upload, userdonate.addbook)
router.post('/viewuserdonatebook/:id', userdonate.viewuserbook)
router.post('/viewalluserdonatebook', userdonate.viewalluserbook)
router.get('/otheruserbooks/:userid', userdonate.viewOtherUsersBooks);
router.post('/lenddonatedbook/:bookid', userdonate.lendBook);

// admin Addbook
const adminaddbook = require('./Admin/adminaddbookController')
router.post('/adminaddbook', adminaddbook.upload, adminaddbook.addbookadmin)
router.post('/viewAllBooks/:id', adminaddbook.viewAllBooks1)
router.post('/deleteBook/:id', adminaddbook.deleteBook)
router.post('/admineditbook/:id', adminaddbook.upload, adminaddbook.admineditbook)
router.post('/adminviewbookone/:id', adminaddbook.adminviewbookone)//
router.post('/viewadminuserbook/:id', adminaddbook.viewuserbook)
// router.post('/viewclubbook/:id',adminaddbook.viewclubbook)
// router.post('/viewallbookforclub',adminaddbook.viewallbookforclub)
router.post('/viewDonationsForAdmin', adminaddbook.viewDonationsForAdmin)

//useraddwishlist
const useraddwishlist = require("./Userwishlist/userWishlistcontroller")
router.post('/userwishlist', useraddwishlist.wishlist)
router.post('/bookviewwishlist/:id', useraddwishlist.viewbookwishlist)
router.post('/deletewishlist/:id', useraddwishlist.deletewishlist)

// const requestController = require('./Clubs/clubrequestController');

// router.post('/sendrequest', requestController.sendRequest);
// router.post('/requests/:clubId', requestController.getRequestsForClub);
// router.get('/userDetails/:userId',requestController.getRequestuser)
// router.get('/userviewclub/:id',requestController.userview)
// router.post('/getAcceptedRequestForClub/:clubId',requestController.getAcceptedRequestForClub)
// router.post('/deleteClubMember/:id',requestController.deleteClubMember)


// router.put('/acceptRequest/:requestId',requestController.acceptRequest)
// router.put('/rejectRequest/:requestId',requestController.rejectRequest)

const lendbook = require("./Lendbyuser/lendbyusercontroller")
router.post('/lendbyuser', lendbook.lend)
router.post('/lendedBooksByUser/:id', lendbook.lendedBooksByUser)
router.post('/calcFineForUser/:id', lendbook.calcFineForUser)
router.post('/returnbook/:id', lendbook.returnbackbook)

const exchange = require('./User/userExchangeController')
router.post('/exchangebook', exchange.userExchangebook)
router.get('/exchangerequests/:userid', exchange.getuserExchangebook)


router.put('/acceptExchangeRequest/:exchangeId', exchange.acceptExchangeIdRequest)
router.put('/rejectExchangeRequest/:exchangeId', exchange.rejectExchangeIdRequest)
router.post('/displayexchangerequests', exchange.displayExchangeRequest)


// library

const libraryController = require("./library/libraryController");

router.post("/addlibrary", libraryController.upload, libraryController.addLibrary);
router.post("/librarylogin", libraryController.libraryLogin);
// router.post("/libraryforgot", libraryController.libraryForgotPasswordReq);
router.post("/library_forgotpswd", libraryController.libraryForgotPassword);
router.get("/getlibraries", libraryController.getLibraries);
router.delete("/removelibrary/:id", libraryController.removeLibrary);
router.get("/viewalibrary/:id", libraryController.viewLibraryById);
router.post("/editlibrary/:id", libraryController.upload, libraryController.editLibraryById);
router.get("/librarynotifications", libraryController.libraryNotification);


// library request

const libraryRequestController = require('./library/libraryrequestController');
router.post('/sendRequest', libraryRequestController.sendRequest);
router.get('/pendingRequests/:libraryId', libraryRequestController.getRequestsForLibrary);
router.get('/acceptedRequests/:libraryId', libraryRequestController.getAcceptedRequestsForLibrary);
router.put('/acceptRequest/:requestId', libraryRequestController.acceptRequest);
router.put('/rejectRequest/:requestId', libraryRequestController.rejectRequest);
router.get('/userRequests/:userId', libraryRequestController.viewUserLibraryRequests);
router.delete('/leaveLibrary/:id', libraryRequestController.leaveLibrary);
router.delete('/deleteMember/:id', libraryRequestController.deleteLibraryMember);
router.get('/acceptedLibraries/:userId', libraryRequestController.getAcceptedLibrariesForUser);

const {addBookToLibrary,upload,viewLibraryBooks,viewAllDonatedBooksByAdmin,lendBookFromLibrary,returnLibraryBook,
    getLendedBooksByUser,getLendedBooksByLibrary,getLendedBooksByAdmin,editLibraryBook,
    deleteLibraryBook
} = require("./library/librarydonateController");
const { events } = require("./library/libraryrequestsSchema");

router.post("/addBook", upload, addBookToLibrary);
router.get("/viewBooks/:id", viewLibraryBooks);
router.get("/viewlibrarydonateBooks", viewAllDonatedBooksByAdmin);
router.post('/library/edit/:bookid', editLibraryBook);
router.post('/library/delete/:bookid', deleteLibraryBook);
router.post('/library/lend/:bookid', lendBookFromLibrary);
router.post('/library/return/:bookid', returnLibraryBook);
router.get("/lended-books/user/:userId", getLendedBooksByUser);
router.get("/lended-books/library/:libraryId", getLendedBooksByLibrary);
router.get("/lended-books/admin", getLendedBooksByAdmin);

const libraryEventController = require("./LibraryEvents/LibraryeventController");
router.post("/add/events", libraryEventController.createEvent);
router.get("/viewall/events", libraryEventController.getAllEvents);
router.get("/viewevents/:libraryId", libraryEventController.getEventsByLibrary);
router.get("/deleteevents/id", libraryEventController.deleteEvents);

module.exports=router
 


