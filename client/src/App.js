import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'remixicon/fonts/remixicon.css'
import ReaderSignin from "./Components/Readers/ReaderSignin";
import ReaderNavbar from "./Components/Readers/ReaderNavbar";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import ClubNavbar from "./Components/Clubs/ClubNavbar";
import LoginNavbar from "./Components/Pages/LoginNavbar";
import ReaderHomeNavbar from "./Components/Readers/ReaderHomeNavbar";
import AdminHomeNavbar from "./Components/Admin/AdminHomeNavbar";
import ClubHomeNavbar from "./Components/Clubs/ClubHomeNavbar";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ReaderForgotpassword from "./Components/Readers/ReaderForgotpassword";
import AboutPage from "./Components/Pages/AboutPage";
import ReaderHome from './Components/Readers/ReaderHome';
import ReaderLoginpage from "./Components/Readers/ReaderLoginpage";
import ReaderExchange from "./Components/Readers/ReaderExchange";
// import ClubLogin from "./Components/Clubs/ClubLogin";
// import ClubSignin from "./Components/Clubs/ClubSignin";
import AdminLogin from "./Components/Admin/AdminLogin";
import ReaderProfile from "./Components/Readers/ReaderProfile";
import Readerdonatebook from "./Components/Readers/Readerdonatebook";
import Clubdonatebook from "./Components/Clubs/Clubdonatebook"
import ReaderExchangeRequest from "./Components/Readers/ReaderExchangeRequest";
import AdminAddBook from "./Components/Admin/AdminAddBook";
import ClubForgotpassword from "./Components/Clubs/ClubForgotpassword";
import Readerforgotpswdsec from "./Components/Readers/Readerforgotpswdsec"
import Clubhome from "./Components/Clubs/clubhome"
import Readerforgotpswdafter from "./Components/Readers/Readerforgotpswdafter"
import ClubNotificationPage from "./Components/Clubs/ClubNotificationPage";
import AdminClubList from "./Components/Admin/AdminClubList";
// import ClubProfile from "./Components/Clubs/ClubProfile"

import AdminHome from "./Components/Admin/AdminHome";


// import AdminHome from "./Components/Admin/AdminHome";
import ReaderFooter from "./Components/Readers/ReaderFooter";

import AdminExchange from "./Components/Admin/AdminExchange";
import AdminViewBooks from "./Components/Admin/AdminViewBooks";

import AdminViewUsers from "./Components/Admin/AdminViewUsers";
// import ClubMembers from "./Components/Clubs/ClubMembers";
import ClubViewBooks from "./Components/Clubs/ClubViewBooks";
import ReaderViewBooks from "./Components/Readers/ReaderViewBooks";
import ReaderViewClubs from "./Components/Readers/ReaderViewClubs";
import AdminDonation from "./Components/Admin/AdminDonation";


// import Clubforgotpswdafter from "./Components/Clubs/Clubforgotpswdafter";
// import Clubforgotpswdsec from "./Components/Clubs/Clubforgotpswdsec";
import LibraryEditBook from "./Components/Library/LibraryEditBook/LibraryEditBook"

// import AdminExchangeDetails from "./Components/Admin/AdminExchangeDetails";
import Admineditbook from "./Components/Admin/admineditbook"
import ReaderViewLendedBooks from "./Components/Readers/ReaderViewLendedBooks";
import ClubViewMembers from "./Components/Clubs/ClubViewMembers";
import ReaderReturnBook from "./Components/Readers/ReaderReturnBook";
import LibraryRegister from "./Components/Library/LibraryRegister/LibraryRegister";
import LibraryLogin from "./Components/Library/LibraryLogin/LibraryLogin";
import LibraryProfile from "./Components/Library/LibraryProfile/LibraryProfile";
import LibraryForgotPassword from "./Components/Library/LibraryForgotPassword/LibraryForgotPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import LibraryEvents from "./Components/Library/LibraryEvents/LibraryEvents";
import LibraryViewEvents from "./Components/Library/LibraryEvents/LibraryViewEvents";
import ReaderViewAllBooksByOtherUsers from "./Components/Readers/ReaderViewAllBooksByOtherUsers";
import LibraryLendedBooks from "./Components/Library/LibraryLendedBooks/LibraryLendedBooks";
import ChatBot from "./Components/ChatBot/ChatBot";
import AdminViewLendedList from "./Components/Admin/AdminViewLendedList";
import ReaderViewBooksDetailedPage from "./Components/Readers/ReaderViewBooksDetailedPage";

function App() {

  //local
  // const url = 'http://localhost:4059/'
  const url = process.env.REACT_APP_API_URL;


  return (
    <BrowserRouter basename="/book_swap">
      <div>
        <Routes>
 
          <Route path="/reader-view-all-other-user-book"
          element={
            <>
              <ReaderHomeNavbar />
              <ReaderViewAllBooksByOtherUsers/>
            </>
          }
          ></Route>


          <Route path="/reader-view-events"
          element={
            <>
            <ReaderHomeNavbar />
            <LibraryViewEvents/>
            </>
          }
          ></Route>

          <Route path="/aboutPage" element={<AboutPage />} />
          <Route path='/readerhome' element={<ReaderHome />} />
          <Route path="/readersignin" element={[<LoginNavbar />, <ReaderSignin />]} />
          <Route path="/readerforgotpswd" element={<ReaderForgotpassword />} />
          <Route path="/readernavbar" element={<ReaderNavbar />} />
          <Route path="/adminnavbar" element={<AdminNavbar />} />
          <Route path="/clubsnavbar" element={<ClubNavbar />} />
          <Route path="/loginnavbar" element={<LoginNavbar />} />
          <Route path="/readerhomenavbar" element={<ReaderHomeNavbar />} />
          <Route path="/adminhomenavbar" element={<AdminHomeNavbar />} />
          <Route path="/clubhomenavbar" element={<ClubHomeNavbar />} />
          <Route path="/readerexchange" element={<ReaderExchange />} />
          <Route path="/readerexchangerequest" element={<ReaderExchangeRequest />} />
          <Route path="/adminaddbook" element={<AdminAddBook />} />
          <Route path="/clubforgotpassword" element={[<LoginNavbar />, <ClubForgotpassword />]} />

          {/* ------------Reader---------- */}

          <Route path="/" element={[<ReaderNavbar />, <ReaderHome />]} />
          <Route path="/reader_loginpage" element={[<ReaderNavbar />, <ReaderLoginpage />]} />
          <Route path="/reader_signin" element={[<ReaderNavbar />, <ReaderSignin />]} />
          <Route path="/reader_home" element={[<ReaderHomeNavbar />, <ReaderHome />]} />
          <Route path="/reader_about" element={[<ReaderHomeNavbar />, <AboutPage />]} />
          <Route path="/reader_forgotpswd" element={[<ReaderNavbar />, <ReaderForgotpassword />]} />
          <Route path="/reader_profile_account_info" element={[<ReaderHomeNavbar />, <ReaderProfile data='account' />]} />
          <Route path="/reader_profile_notification" element={[<ReaderHomeNavbar />, <ReaderProfile data='notification' />]} />
          <Route path="/reader_profile_club" element={[<ReaderHomeNavbar />, <ReaderProfile data='club' />]} />
          <Route path="/reader_profile_donation" element={[<ReaderHomeNavbar />, <ReaderProfile data='donation' />]} />
          <Route path="/reader_profile_help" element={[<ReaderHomeNavbar />, <ReaderProfile data='help' />]} />
          <Route path="/reader_profile_privacy" element={[<ReaderHomeNavbar />, <ReaderProfile data='privacy' />]} />
          <Route path="/reader_edit_profile" element={[<ReaderHomeNavbar />, <ReaderProfile data='edit' />]} />
          <Route path="/reader_donatebook" element={[<ReaderHomeNavbar />, <Readerdonatebook />]} />
          <Route path="/reader_forgotpswdsec" element={[<ReaderNavbar />, <Readerforgotpswdsec />]} />
          <Route path="/reader_forgotpswdafter" element={[<ReaderNavbar />, <Readerforgotpswdafter />]} />
          <Route path="/reader_exchange" element={[<ReaderHomeNavbar />, <ReaderExchange />]} />
          <Route path="/reader_view_books" element={[<ReaderHomeNavbar />, <ReaderViewBooks url={url} />]} />
          <Route path="/reader_view_clubs" element={[<ReaderHomeNavbar />, <ReaderViewClubs url={url} />]} />
          <Route path="/reader_view_lended_books" element={[<ReaderHomeNavbar />, <ReaderViewLendedBooks url={url} />]} />
          <Route path="/reader_return_book/:lendid/:bid" element={[ <ReaderReturnBook url={url} />]} />
         <Route path="/book-details/:id" element={<><ReaderHomeNavbar></ReaderHomeNavbar>,<ReaderViewBooksDetailedPage/></>}></Route>
          <Route path="/chat" element={<>
          <ReaderHomeNavbar />
          <ChatBot/>
          </>}></Route>


          {/* ------------Club---------- */}


          {/* <Route path="/club_landing" element={[<ClubNavbar />, <ReaderHome />]} />
          <Route path="/club_register" element={[<LoginNavbar />, <ClubSignin />]} />
          <Route path="/club_login" element={[<LoginNavbar />, <ClubLogin />]} />
          <Route path="/club_donatebook" element={[<ClubHomeNavbar />, <Clubdonatebook />]} />
          <Route path="/club_profile" element={[<ClubHomeNavbar />, <ClubProfile url={url} />]} />
          <Route path="/club_home" element={[<ClubHomeNavbar />, <Clubhome />]} />
          <Route path="/club_about" element={[<ClubHomeNavbar />, <AboutPage />]} />
          <Route path="/club_view_books" element={[<ClubHomeNavbar />, <ClubViewBooks url={url} />]} />
          <Route path="/club_forgotpswdsec" element={[<LoginNavbar />, <Clubforgotpswdsec />]} />
          <Route path="/club_forgotpswdafter" element={[<LoginNavbar />, <Clubforgotpswdafter />]} />
          <Route path="/clubnotificationpage" element={[<ClubHomeNavbar />, <ClubNotificationPage url={url} />]} />
          <Route path="/club_view_members" element={[<ClubHomeNavbar />, <ClubViewMembers url={url} />]} /> */}


          {/* -----------Libraries----------- */}
          {/* <Route path="/library_landing" element={[<ClubNavbar />, <ReaderHome />]}/>
          <Route path="/library_register" element={[<LoginNavbar />, <ClubSignin />]}/>
          <Route path="/library_login" element={[<LoginNavbar />, <ClubLogin />]} />
          <Route path="/library_donatebook" element={[<ClubHomeNavbar/>,<Clubdonatebook/>]}/>
          <Route path="/library_profile" element={[<ClubHomeNavbar/>,<ClubProfile url={url} />]}  />        
          <Route path="/library_home" element={[<ClubHomeNavbar/>,<Clubhome/>]}/><Clubdonatebook />
          <Route path="/library_about" element={[<ClubHo<Clubdonatebook />meNavbar/>,<AboutPage/>]}/>
          <Route path="/library_view_books" element={[<ClubHomeNavbar/>,<ClubViewBooks url={url}/>]}/>
          <Route path="/library_forgotpswdsec" element={[<LoginNavbar />,<Clubforgotpswdsec/>]}/>
          <Route path="/library_forgotpswdafter" element={[<LoginNavbar />,<Clubforgotpswdafter/>]}/>
          <Route path="/librarynotificationpage" element={[<ClubHomeNavbar/>,<ClubNotificationPage url={url}/>]} />
          <Route path="/library_view_members" element={[<ClubHomeNavbar/>,<ClubViewMembers url={url}/>]} /> */}

          <Route path="/library_home" element={[<ClubHomeNavbar />, <Clubhome />]} />
          <Route path="/librarynotificationpage" element={[<ClubHomeNavbar />, <ClubNotificationPage url={url} />]} />
          <Route path="/library_view_books/:clubid" element={[<ClubHomeNavbar />, <ClubViewBooks url={url} />]} />
          <Route path="/library_edit_book/:id" element={[<ClubHomeNavbar />,<Clubdonatebook />]} />
          <Route path="/library_donatebook" element={[<ClubHomeNavbar />, <Clubdonatebook />]} />
          <Route path="/library_view_members" element={[<ClubHomeNavbar />, <ClubViewMembers url={url} />]} />
          <Route path="/library_view_books" element={[<ClubHomeNavbar />, <ClubViewBooks url={url} />]} />
          <Route path="/library_about" element={[<ClubHomeNavbar />, <AboutPage />]} />
          <Route path="/library-register"
            element={
              <>
                <LoginNavbar />
                <LibraryRegister />
              </>
            }
          >
          </Route>

          <Route path="/library-login"
            element={
              <>
                <LoginNavbar />
                <LibraryLogin />
              </>
            }
          >
          </Route>
          <Route path="/library_home"
            element={
              [<ClubHomeNavbar />
                , <Clubhome />
              ]} />


          <Route path="/library_profile"
            element={
              <>
                <ClubHomeNavbar />
                <LibraryProfile url={url} />
              </>
            }

          >

          </Route>
          <Route path="/library-forgotpassword"
            element={
              <>
                <LoginNavbar />
                <LibraryForgotPassword />
              </>
            }
          >

          </Route>

          <Route path="/library-events"
            element={
              <>
                <ClubHomeNavbar />
                <LibraryEvents url={url} />
              </>
            }>
          </Route>

          <Route path="/library-view-events"
          element={
            <>
             <ClubHomeNavbar />
            <LibraryViewEvents/>
            </>
          }
          >
          </Route>
                    <Route path="/admin-view-events"
          element={
            <>
            <AdminHomeNavbar />
            <LibraryViewEvents/>
            </>
          }
          >
          </Route>
          <Route path="/library-lended-books"
          element={
            <>
                 <ClubHomeNavbar />
            <LibraryLendedBooks/>
            </>
          }
          >
            
          </Route>

          {/* ------------Admin---------- */}


          <Route path="/admin" element={[<AdminNavbar />, <ReaderHome />]} />
          <Route path="/admin_login" element={[<LoginNavbar />, <AdminLogin />]} />

          {/* <Route path="/admin_home" element={[<AdminHomeNavbar />, <AdminHome />]} />
          <Route path="/admin_about" element={[<AdminHomeNavbar />, <AboutPage />]} />
          <Route path="/admin_club" element={[<AdminHomeNavbar />, <AdminClubList url={url} />]} />
          <Route path="/admin_addbook" element={[<AdminHomeNavbar />, <AdminAddBook />]} />
          <Route path="/admin_viewbook" element={[<AdminHomeNavbar />, <AdminViewBooks url={url} />]} />
          <Route path="/admin_viewusers" element={[<AdminHomeNavbar />, <AdminViewUsers url={url} />]} />
          <Route path="/admin_exchange_req" element={[<AdminHomeNavbar/>,<AdminExchange/>]}/>
          <Route path="/admin_exchange" element={[<AdminHomeNavbar />, <AdminExchange />]} />
          <Route path="/admin_donation" element={[<AdminHomeNavbar />, <AdminDonation />]} />
          <Route path="/admin_editbook/:id" element={[<AdminHomeNavbar />, <Admineditbook />]} /> */}

          {/*=============== admin routes with route protection============= */}

          {/* Admin login (no protection) */}
          <Route path="/admin_login" element={
            <>
              <LoginNavbar />
              <AdminLogin />
            </>
          } />

          {/* Admin landing (not protected, assuming public page) */}
          <Route path="/admin" element={
            <>
              <AdminNavbar />
              {/* Replace ReaderHome with your intended component */}
            </>
          } />

          {/* Protected Admin Pages */}
          <Route path="/admin_home" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminHome />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_about" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AboutPage />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_club" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminClubList url={url} />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_addbook" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminAddBook />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_viewbook" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminViewBooks url={url} />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_viewusers" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminViewUsers url={url} />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_exchange_req" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminExchange />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_exchange" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminExchange />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_donation" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <AdminDonation />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin_editbook/:id" element={
            <ProtectedRoute>
              <>
                <AdminHomeNavbar />
                <Admineditbook />
              </>
            </ProtectedRoute>
          } />
          <Route path="/admin-view-lended-list" element={<>  <AdminHomeNavbar /><AdminViewLendedList/></>}></Route>



        </Routes>
        <ReaderFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;