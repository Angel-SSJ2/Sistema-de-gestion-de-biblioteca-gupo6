import api from './api';

export const getMostLoanedBooks = async () => {
  const response = await api.get('/statistics');
  return response.data;
};

export const getLoansByCategory = async () => {
  const response = await api.get('/statistics/categories');
  return response.data;
};
