// CustomerSupportChat.jsx
import { useState } from 'react';
import axios from 'axios';

export default function CustomerSupportChat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', text: message };
    setChat([...chat, userMessage]);

    try {
      const res = await axios.post('/api/chat', {
        message,
        user_id: 'user123'
      });

      setChat([...chat, userMessage, { type: 'bot', text: res.data.response }]);
      setMessage('');
    } catch (err) {
      console.error('Chatbot error:', err);
      setChat([...chat, userMessage, { type: 'bot', text: 'Something went wrong.' }]);
    }
  };

  return (
    <div>
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
