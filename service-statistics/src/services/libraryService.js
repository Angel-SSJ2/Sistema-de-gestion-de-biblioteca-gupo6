const axios = require('axios');
const config = require('../config');

const apiClient = axios.create({
  baseURL: config.serviceAUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getBooks = async (token) => {
  const response = await apiClient.get('/api/v1/books', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.books || response.data;
};

const getLoans = async (token) => {
  const response = await apiClient.get('/api/v1/loans', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

module.exports = {
  getBooks,
  getLoans,
  apiClient
};
