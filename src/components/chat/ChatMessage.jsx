import { motion } from "framer-motion";

const ChatMessage = ({ message, currentUser }) => {

  const isMine = message.sender._id === currentUser;

  const senderName = isMine ? "You" : message.sender.name;

  const time = new Date(message.timestamp || message.createdAt)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
    >

      {/* Sender Name */}

      <span
        className={`text-[11px] mb-1 font-medium ${
          isMine ? "text-orange-500" : "text-gray-500"
        }`}
      >
        {senderName}
      </span>

      {/* Message Bubble */}

      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm relative
        ${isMine
          ? "bg-orange-500 text-white rounded-br-sm"
          : "bg-gray-200 text-gray-800 rounded-bl-sm"
        }`}
      >
        <p className="break-words">{message.text}</p>

        {/* Timestamp */}

        <div
          className={`text-[10px] mt-1 text-right ${
            isMine ? "text-orange-100" : "text-gray-500"
          }`}
        >
          {time}
        </div>
      </div>

    </motion.div>
  );
};

export default ChatMessage;