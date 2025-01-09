import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/run-flow", { inputValue: input });
      setResponse(res.data.outputs[0]?.outputs[0]?.outputs?.message?.message?.text || "No response");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to Langflow.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Chat with Langflow</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-gray-600">Response:</h3>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
