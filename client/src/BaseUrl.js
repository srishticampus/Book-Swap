import axios from 'axios';
// console.log(process.env.VITE_API_URL);

const axiosInstance = axios.create({

  // server api

  // baseURL: '', 

  // local api

  // baseURL: import.meta.env.VITE_API_URL , 

  //  baseURL: process.env.VITE_API_URL,


  // baseURL: 'http://localhost:4059',
  // headers: {
  //   'Content-Type': 'application/json',
  // },


    baseURL: process.env.REACT_APP_API_URL, // ✅ CRA-compatible
  headers: {
    'Content-Type': 'application/json',
  },

});

export default axiosInstance