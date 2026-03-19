import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { getSocket } from "../../socket/socket";
import { getChat } from "../../services/chatService";
import { useAuth } from "../../context/AuthContext";

const ChatModal = ({ request, onClose }) => {
  const { user } = useAuth();
  const socket = getSocket();

  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();

  // 🔥 Determine other user
  const otherUser = useMemo(() => {
    if (!request) return null;

    if (request.hosteller?._id === user._id) {
      return request.acceptedBy;
    }
    return request.hosteller;
  }, [request, user]);

  useEffect(() => {
    const loadChat = async () => {
      const data = await getChat(request._id);
      setMessages(data.messages || []);
    };
    loadChat();
  }, [request]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_request_room", request._id);

    socket.on("new_message", ({ requestId, message }) => {
      if (requestId !== request._id) return;

      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [request, socket]);

  const sendMessage = (text) => {
    socket.emit("send_message", {
      requestId: request._id,
      text,
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md h-[82vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white">
            <div>
              <h2 className="font-semibold text-lg">
                {otherUser?.name || "Chat"}
              </h2>
              <p className="text-xs opacity-80">Online</p>
            </div>

            <button
              onClick={onClose}
              className="hover:scale-110 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-linear-to-b from-gray-50 to-white">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                currentUser={user._id}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <ChatInput onSend={sendMessage} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;