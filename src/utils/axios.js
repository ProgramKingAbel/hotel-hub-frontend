import axios from 'axios';

const BASE_URL = process.env.REACT_APP_HOST_URL;

const setBaseUrl = (endpoint) => BASE_URL + endpoint;

const axiosInstance = axios.create({
  baseURL: setBaseUrl(''),
  headers: {
    Authorization: localStorage.getItem('authToken') || '',
  },
});

export default axiosInstance;
