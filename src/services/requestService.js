import api from "../utils/api";

export const createRequest = async(data) => {
    try {
        const response = await api.post("/request",data);
        return response.data;
    } catch (error) {
        throw error;
    }
}