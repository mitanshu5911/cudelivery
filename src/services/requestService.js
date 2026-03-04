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
