import api from "../utils/api";

export const createRequest = async(data) => {
    try {
        const response = await api.post("/request",data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPendingRequests = async() => {
    try {
        const response = await api.get("/request/pending");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const acceptRequest = async(id) => {
    try {
        const response = await api.patch(`/request/${id}/accept`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const markPickedRequest  = async(id) => {
    try {
        const response = await api.patch(`/request/${id}/picked`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const completeRequest   = async(id) => {
    try {
        const response = await api.patch(`/request/${id}/complete`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const  cancelRequest   = async(id) => {
    try {
        const response = await api.patch(`/request/${id}/cancel`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyDeliveries = async () => {
    try {
        const response = await api.get("/request/my-deliveries");
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const getMyRequests = async () => {
    try {
        const response = await api.get("/request/my-requests");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteRequest = async (id) => {
    try {
        const response = await api.delete(`/request/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRequestById = async (id) => {
  try {
    const res = await api.get(`/request/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateRequest = async (id, payload) => {
  const res = await api.patch(`/request/${id}`, payload);
  return res.data;
};