import api from './api';

export const getLibrarySummary = async () => {
  const response = await api.get('/summary');
  return response.data;
};
