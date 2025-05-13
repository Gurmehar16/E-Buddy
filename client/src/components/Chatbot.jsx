import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/chatbot/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, from: "bot" }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong. Please try again.",
          from: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 p-3 rounded-full shadow-lg text-white hover:bg-blue-700 transition"
          aria-label="Open chatbot"
        >
          <MessageCircle />
        </button>
      ) : (
        <div className="bg-white dark:bg-[#1f1f1f] shadow-xl border w-80 rounded-2xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Mira - ChatBot</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="h-64 overflow-y-auto space-y-2 mb-3 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4 animate-pulse">
                How can I help you today?
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-left">
                <span className="inline-block px-3 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700">
                  Typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border rounded-full px-4 py-2 w-full text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={`bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
