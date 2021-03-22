import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Vitor-Franco/01-02-componentizando-aplicacao',
});