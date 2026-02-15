import api from "../utils/api"

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
}