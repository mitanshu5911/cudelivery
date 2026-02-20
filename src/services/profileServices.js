import api from "../utils/api";

export const getMyProfile = async () => {
  try {
    const res = await api.get("/profile/get");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createProfile = async (formData) => {
  try {
    const res = await api.post("/profile/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Profile creation failed" };
  }
};

export const updateProfile = async (formData) => {
  try {
    const res = await api.put("/profile/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Profile update failed" };
  }
};