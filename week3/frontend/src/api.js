import axios from 'axios';

const port = process.env.SERVER_PORT || 4000
const instance = axios.create({
  // baseURL: `http://localhost:${port}/`,
  baseURL: `http://18.182.163.170:${port}/`,
});

export default instance;