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

