import axios from 'axios';

const axiosInstance = axios.create({

  //server api

  // baseURL: '', 

//local api

  baseURL: import.meta.env.VITE_API_URL , 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance