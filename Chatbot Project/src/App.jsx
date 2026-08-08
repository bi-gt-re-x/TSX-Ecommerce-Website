import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './App.css';

function ChatInput({ chatMessages, setChatMessages }) {
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

function ChatMessage(props) {
  const message = props.message;
  const sender = props.sender;
  if (sender === 'robot') {
    return (
      <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
        <img className="chat-message-profile" src="/robot_image.png" alt="Robot" />
        <div className="chat-message-text">
          {message}
        </div>
      </div>
    );
  } else {
    return (
      <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
        <div className="chat-message-text">
          {message}
        </div>
        <img className="chat-message-profile" src="/person_image.png" alt="You" />
      </div>
    );
  }
}

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
