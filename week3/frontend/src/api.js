import axios from 'axios';

const port = process.env.SERVER_PORT || 4000
const instance = axios.create({
  baseURL: `http://localhost:${port}/`,
});

export default instance;