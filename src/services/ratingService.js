import api from "../utils/api";

export const submitRating = async (requestId, payload) => {
  try {
    const res = await api.post(`/ratings/${requestId}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};