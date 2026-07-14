import api from './api';

export const getRecommendations = async (category) => {
  const response = await api.get(`/recommendations/${category}`);
  return response.data;
};
