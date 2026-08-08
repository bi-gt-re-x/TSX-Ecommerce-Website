import { useState, useRef, useEffect } from 'react';
import {ChatMessage} from './ChatMessage';

export function ChatMessage(props) {
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

export default ChatMessages;