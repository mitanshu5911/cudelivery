import { motion } from "framer-motion";

const ChatMessage = ({ message, currentUser }) => {
  const isMine = message.sender?._id === currentUser;

  const senderName = isMine ? "You" : message.sender?.name || "User";

  const time = new Date(message.timestamp || message.createdAt)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div className="max-w-[75%]">
        <span
          className={`text-[10px] mb-1 block ${
            isMine ? "text-right text-orange-500" : "text-gray-500"
          }`}
        >
          {senderName}
        </span>

        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-md transition ${
            isMine
              ? "bg-orange-500 text-white rounded-br-sm"
              : "bg-gray-200 text-gray-800 rounded-bl-sm"
          }`}
        >
          {message.text}

          <div
            className={`text-[10px] mt-1 ${
              isMine ? "text-orange-100" : "text-gray-500"
            } text-right`}
          >
            {time}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;