import React, { useState } from 'react';
import '../css/ChatBox.css'; 
import Typewriter from './TypeWriter.js';
import LoadingAnimation from './LoadingAnimation.js';

function ChatBox({ onSendMessage, conversation }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSendMessage(inputText);
    setInputText('');
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="placeholder"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          disabled={isLoading}
          placeholder="Ask anything about Amr..."
        />
        <button className="button" type="submit" disabled={isLoading}>Generate</button>
      </form>
      <div className="messages">
        {conversation.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'userText' : 'generatedText'}>
            {message.role === 'assistant' ? (
              <Typewriter text={message.content} speed={40} fontSize="25px" showCaret={false} />
            ) : (
              message.content
            )}
          </div>
        ))}
      </div>
      {isLoading && <LoadingAnimation />} {/* Show the loading animation when isLoading is true */}
    </div>
  );
}

export default ChatBox;
