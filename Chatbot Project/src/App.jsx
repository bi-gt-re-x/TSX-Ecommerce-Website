import { useState, useRef, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import './App.css';

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container"
    ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage message={chatMessage.message} sender={chatMessage.sender} key={chatMessage.id} />
        )
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: 'Hello Chatbot', sender: 'user', id: 'id1' },
    { message: 'Hello! How can I help you?', sender: 'robot', id: 'id2' },
    { message: "Can you give me Today's date?", sender: 'user', id: 'id3' },
    { message: "Today is August 2nd", sender: 'robot', id: 'id4' }
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default App;
