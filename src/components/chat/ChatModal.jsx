import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { socket } from "../../socket/socket";
import { getChat } from "../../services/chatService";
import { useAuth } from "../../context/AuthContext";

const ChatModal = ({ request, onClose }) => {

  const { user } = useAuth();

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef();

  useEffect(() => {

    const loadChat = async () => {

      const data = await getChat(request._id);

      setMessages(data.messages || []);
    };

    loadChat();

  }, [request]);

  useEffect(() => {

    socket.connect();

    socket.emit("join_request_room", request._id);

    socket.on("receive_message", (msg) => {

      setMessages((prev) => [...prev, msg]);

    });

    return () => {

      socket.off("receive_message");

    };

  }, [request]);

  const sendMessage = (text) => {

    socket.emit("send_message", {
      requestId: request._id,
      senderId: user._id,
      text
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
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white w-full max-w-md h-[80vh] rounded-2xl shadow-xl flex flex-col overflow-hidden"
        >

          {/* Header */}

          <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-3">

            <h2 className="font-semibold">
              Chat — {request.orderId}
            </h2>

            <button onClick={onClose}>
              <X size={20}/>
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">

            {messages.map((msg, i) => (

              <ChatMessage
                key={i}
                message={msg}
                currentUser={user._id}
              />

            ))}

            <div ref={bottomRef}/>

          </div>

          {/* Input */}

          <ChatInput onSend={sendMessage}/>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

export default ChatModal;