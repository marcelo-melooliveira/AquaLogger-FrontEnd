import axios from 'axios';

const api = axios.create({
   baseURL: 'https://mellus.com.br', 
  // baseURL: 'http://192.168.1.7:3333',
  // baseURL: 'http://localhost:3333',
});
export default api;
