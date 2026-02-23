import api from "../utils/api"

const handleApiError = (error) =>{
  if(error.response){
     throw new Error(
      error.response.data?.message || "Something went wrong"
    );
  }

   if (error.request) {
    throw new Error("Network error. Please try again later.");
  }

  throw new Error(error.message || "Unexpected error occurred");
};

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
   handleApiError(error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyResetToken = async (token) => {
  try {
    const response = await api.get(`/auth/reset-password/verify/${token}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};