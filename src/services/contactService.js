import api from "../utils/api";

export const sendContactMessage = async (data) => {
  const res = await api.post("/contact", data);
  return res.data;
};