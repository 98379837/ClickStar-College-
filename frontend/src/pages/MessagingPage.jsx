import { useEffect, useState } from "react";
import axios from "axios";

export default function MessagingPage() {
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const send = async () => {
    await axios.post("http://localhost:5000/api/messages/send", { receiverId, message }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchMessages();
    setMessage("");
  };

  const fetchMessages = async () => {
    const res = await axios.get(`http://localhost:5000/api/messages/with/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(res.data);
  };

  return (
    <div className="p-4">
      <input value={receiverId} onChange={(e) => setReceiverId(e.target.value)} placeholder="Receiver ID" className="border p-2 w-full mb-2" />
      <div className="border p-4 h-64 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.senderId === receiverId ? "text-right" : "text-left"}>
            <p className="bg-gray-200 inline-block px-2 py-1 rounded">{msg.message}</p>
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className="border p-2 w-full mb-2" />
      <button onClick={send} className="bg-blue-600 text-white px-4 py-2">Send</button>
    </div>
  );
}
