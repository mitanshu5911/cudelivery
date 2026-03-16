import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend }) => {

  const [message, setMessage] = useState("");

  const send = () => {

    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-3 p-3 border-t bg-white">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <button
        onClick={send}
        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
      >
        <Send size={18}/>
      </button>

    </div>
  );
};

export default ChatInput;