import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.17.0.1:3333',
});