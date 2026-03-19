import api from "../utils/api";

export const submitRating = async (requestId, payload) => {
  try {
    const res = await api.post(`/ratings/${requestId}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// services/ratingService.js
export const getMyRatings = async (userId) => {
  const res = await api.get(`/ratings/day-scholar/${userId}`);
  return res.data;
};

