import { useEffect, useState } from 'react' // Named Export
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage';
import ChatMessages from './components/ChatMessages'; // Default Export (onlyy one from that file can be imported.)
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Chatbot.addResponses(
      {
        "How are you?": "I'm great! How about you?"
      }
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App