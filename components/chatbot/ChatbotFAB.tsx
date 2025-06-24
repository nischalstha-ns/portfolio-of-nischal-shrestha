
import React from 'react';

interface ChatbotFABProps {
  onOpen: () => void;
  isChatbotOpen: boolean;
}

const ChatbotFAB: React.FC<ChatbotFABProps> = ({ onOpen, isChatbotOpen }) => {
  return (
    <button
      onClick={onOpen}
      aria-label={isChatbotOpen ? "Close Chatbot" : "Open Chatbot"}
      title={isChatbotOpen ? "Close Chatbot" : "Open Chatbot"}
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl flex items-center justify-center
                  bg-accent dark:bg-accent-dark text-white 
                  hover:bg-green-600 dark:hover:bg-green-500
                  focus:outline-none focus:ring-4 focus:ring-accent/50 dark:focus:ring-accent-dark/50
                  transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95`}
    >
      <ion-icon 
        name={isChatbotOpen ? "close-outline" : "chatbubbles-outline"} 
        class="text-3xl transition-transform duration-300"
        style={{ transform: isChatbotOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      ></ion-icon>
    </button>
  );
};

export default ChatbotFAB;
