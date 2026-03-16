import api from "../utils/api";

export const getChat = async (requestId) => {
  try {
    const res = await api.get(`/chat/${requestId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};