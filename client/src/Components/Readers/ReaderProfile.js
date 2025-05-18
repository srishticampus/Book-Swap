import React from 'react'
import "../Readers/ReaderProfile.css";
import ReaderProfileSidebar from "./ReaderProfileSidebar";
import ReaderProfileAccountInfo from "./ReaderProfileAccountInfo";
import ReaderProfileNotification from "./ReaderProfileNotification";
import ReaderProfileClub from "./ReaderProfileClub";
import ReaderProfileDonation from "./ReaderProfileDonation";
import ReaderProfileHelp from './ReaderProfileHelp';
import ReaderProfilePrivacy from './ReaderProfilePrivacy';
import ReaderEditProfile from './ReaderEditProfile';

function ReaderProfile({ data }) {

   //local
   const url='http://localhost:4001'

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }} className='container'>
      <ReaderProfileSidebar url={url} />
      {data === "account" ? (
        <ReaderProfileAccountInfo />
      ) : data === "notification" ? (
        <ReaderProfileNotification />
      ) : data === "club" ? (
        <ReaderProfileClub url={url} />
      ): data === "donation" ? (
        <ReaderProfileDonation url={url} />
      ):data === "help" ? (
        <ReaderProfileHelp />
      ): data === "privacy" ? (
        <ReaderProfilePrivacy />
      ): data === "edit" ? (
        <ReaderEditProfile url={url} />
      ):''}
    </div>
  );
}

export default ReaderProfile


