import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://680289390a99cb7408e9df3f.mockapi.io/students',
});