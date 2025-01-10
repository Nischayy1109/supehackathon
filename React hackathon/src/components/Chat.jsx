import { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/bgimg4.jpeg";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post("http://localhost:3000/run-flow", { inputValue: input });
      const responseText = res.data.outputs[0]?.outputs[0]?.outputs?.message?.message?.text || "No response";

      const newEntry = { prompt: input, response: responseText };
      setHistory((prev) => [...prev, newEntry]);
      setResponse(responseText);
    } catch (error) {
      console.error("Error:", error);
      const errorEntry = { prompt: input, response: "Error connecting to Langflow." };
      setHistory((prev) => [...prev, errorEntry]);
      setResponse("Error connecting to Langflow.");
    } finally {
      setInput("");
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for Chat History */}
      <div className="w-1/4 bg-gray-900 text-white flex flex-col">
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Chat History</h2>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
            >
              Clear History
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div
                key={index}
                className="p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              >
                <p className="text-sm font-bold">User: {entry.prompt}</p>
                <p className="text-sm text-gray-300">Bot: {entry.response}</p>
              </div>
            ))
          ) : (
            <p className="px-4 py-4 text-gray-400">No history yet...</p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="w-3/4 flex flex-col"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.4)", // fallback for transparency
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Chat Messages */}
        <div className="p-6 overflow-y-auto" style={{ flexGrow: 1 }}>
          {history.map((entry, index) => (
            <div key={index} className="mb-4">
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-500 text-3xl" />
                  <div className="bg-black text-white rounded-lg p-3 max-w-xs">
                    <p>{entry.prompt}</p>
                  </div>
                </div>
              </div>
              {/* Bot Response */}
              <div className="flex justify-start mt-2">
                <div className="flex items-center space-x-2">
                  <FaRobot className="text-black-500 text-3xl" />
                  <div className="bg-black text-white rounded-lg p-3 max-w-xs">
                    <p>{entry.response}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center p-4 bg-white shadow-lg rounded-lg mx-auto"
          style={{
            width: "70%", // Width of the input area
            marginBottom: "6rem", // Adds some spacing below
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-slate-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 bg-gray-600 hover:bg-gray-800 text-white p-3 rounded-lg"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;







