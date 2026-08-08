import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      if (!inputText.trim()) return;

      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
        }
      ];

      setChatMessages(newChatMessages);
      setInputText('');

      const response = await Chatbot.getResponseAsync(inputText);

      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
        }
      ]);
    }

    else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a Message to Chatbot" 
        size="30" 
        value={inputText} 
        onChange={saveInputText}
        onKeyDown={sendMessage}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
}