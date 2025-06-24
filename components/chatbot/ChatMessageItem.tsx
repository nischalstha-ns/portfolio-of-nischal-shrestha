
import React from 'react';
import { ChatMessage, TextToSpeechControls, Theme } from '../../types';

interface ChatMessageItemProps {
  message: ChatMessage;
  tts: TextToSpeechControls;
  theme: Theme;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, tts, theme }) => {
  const { text, sender, timestamp, language, id, isLoading } = message;

  const isUser = sender === 'user';
  const isBot = sender === 'bot';

  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePlayPauseResume = () => {
    if (tts.currentMessageId === id) {
      if (tts.isPlaying && !tts.isPaused) {
        tts.pause();
      } else if (tts.isPaused) {
        tts.resume();
      } else { // Not playing, or was stopped and now re-clicked
        tts.speak(text, language, id);
      }
    } else { // Different message or no message playing
      tts.speak(text, language, id);
    }
  };

  const getPlayIconName = () => {
    if (tts.currentMessageId === id) {
      if (tts.isPlaying && !tts.isPaused) return "pause-outline";
      if (tts.isPaused) return "play-circle-outline"; // Resume icon
    }
    return "play-outline"; // Default play
  };

  const getPlayTitle = () => {
    if (tts.currentMessageId === id) {
      if (tts.isPlaying && !tts.isPaused) return "Pause";
      if (tts.isPaused) return "Resume";
    }
    return "Play";
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div 
        className={`max-w-[75%] p-3 rounded-xl shadow ${
          isUser 
            ? 'bg-accent dark:bg-accent-dark text-white rounded-br-none' 
            : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{isLoading ? 'Thinking...' : text}</p>
        <div className={`text-xs mt-1.5 ${isUser ? 'text-gray-200 dark:text-gray-300 text-right' : 'text-gray-500 dark:text-gray-400 text-left'}`}>
          {formattedTime}
        </div>
        {isBot && !isLoading && tts.isSupported && text && (
          <div className="mt-2 flex items-center space-x-2">
            <button 
              onClick={handlePlayPauseResume}
              title={getPlayTitle()}
              className={`p-1 rounded-full ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-600'} transition-colors`}
              aria-label={getPlayTitle()}
            >
              <ion-icon 
                name={getPlayIconName()}
                class={`text-lg ${theme === 'light' ? 'text-accent' : 'text-accent-dark'}`}
              ></ion-icon>
            </button>
            {(tts.isPlaying && tts.currentMessageId === id) && (
              <button 
                onClick={() => tts.stop()}
                title="Stop"
                className={`p-1 rounded-full ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-600'} transition-colors`}
                aria-label="Stop audio"
              >
                <ion-icon name="stop-outline" class={`text-lg ${theme === 'light' ? 'text-accent' : 'text-accent-dark'}`}></ion-icon>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;
