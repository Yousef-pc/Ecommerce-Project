import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import LoadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages, isLoading, setIsLoading}) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText === "") {
      return;
    }

    if (isLoading === true) {
      return;
    }
    
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages, 
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ]

    setChatMessages(newChatMessages);
    setInputText('');
    // Showing LOading... state before the real message is sent by the Robot:
    setChatMessages([
      ...newChatMessages, 
      {
        message: <img src={LoadingSpinnerGif} className="loading-img"/>,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ]);
    // Main message by the Robot:
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages, 
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ]);

    setIsLoading(false);
  }

  async function sendMessageByEnter(event) {
    if (event.key !== "Enter") return;

    if (inputText === "") {
      return;
    }

    if (isLoading === true) {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages, 
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ]

    setChatMessages(newChatMessages);
    setInputText('');
    // Showing LOading... state before the real message is sent by the Robot:
    setChatMessages([
      ...newChatMessages, 
      {
        message: <img src={LoadingSpinnerGif} className="loading-img" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    // Main message by the Robot:
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages, 
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ]);

    setIsLoading(false);
  }

  function resetInputByEsc(event) {
    if (event.key === "Escape") {
      setInputText('');
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to the Chatbot" 
        size="30"
        onChange={saveInputText}
        onKeyDown={(event) => {
          sendMessageByEnter(event);
          resetInputByEsc(event);
        }}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
      <button
        onClick={clearMessages}
        className="clear-button"
      >
        Clear
      </button>
    </div>
  );
}