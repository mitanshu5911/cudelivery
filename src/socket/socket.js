import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

let socket;

export const connectSocket = (userId) => {
  socket = io(SOCKET_URL, {
    autoConnect: true,
    auth: { userId }
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
    });
  }
  return socket;
};