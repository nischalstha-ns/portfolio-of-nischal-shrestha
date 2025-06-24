
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, HarmCategory, HarmBlockThreshold } from '@google/genai';
import { ChatMessage, SupportedLanguage, SUPPORTED_LANGUAGES_MAP, Theme } from '../../types';
import { CHATBOT_MODEL_NAME, CHATBOT_INITIAL_LANGUAGE, getChatbotSystemInstruction, WELCOME_MESSAGES } from '../../constants';
import ChatMessageItem from './ChatMessageItem';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isOpen, onClose, theme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(CHATBOT_INITIAL_LANGUAGE);
  const [geminiChat, setGeminiChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWelcomedForSession, setHasWelcomedForSession] = useState<Record<SupportedLanguage, boolean>>({
    'en-US': false, 'ne-NP': false, 'hi-IN': false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tts = useTextToSpeech();
  const stt = useSpeechRecognition();

  const API_KEY = (window as any).process?.env?.API_KEY;

  const initializeChat = useCallback(async (language: SupportedLanguage) => {
    if (!API_KEY) {
      setError("API Key not found. Chatbot disabled.");
      console.error("Gemini API Key not found.");
      setGeminiChat(null); 
      return null; 
    }
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const newChatSession = ai.chats.create({
        model: CHATBOT_MODEL_NAME,
        config: {
          systemInstruction: getChatbotSystemInstruction(language),
          safetySettings: [ 
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          ],
        },
      });
      setGeminiChat(newChatSession);
      setError(null);
      return newChatSession; 
    } catch (err) {
      console.error("Failed to initialize Gemini Chat:", err);
      setError("Failed to initialize chatbot. Please try again later.");
      setGeminiChat(null);
      return null; 
    }
  }, [API_KEY]); 

  // Effect for initializing and handling welcome message
  useEffect(() => {
    if (isOpen) {
      initializeChat(currentLanguage).then(chatSession => {
        if (chatSession && !hasWelcomedForSession[currentLanguage]) {
          const welcomeText = WELCOME_MESSAGES[currentLanguage];
          const welcomeMessageId = `welcome-${currentLanguage}-${Date.now()}`;
          const welcomeMessage: ChatMessage = {
            id: welcomeMessageId,
            text: welcomeText,
            sender: 'bot', 
            timestamp: new Date(),
            language: currentLanguage,
            isSpoken: !tts.isSupported, 
          };
          setMessages(prev => {
            const noWelcomeExists = !prev.some(m => m.id.startsWith('welcome-') && m.language === currentLanguage);
            return noWelcomeExists ? [welcomeMessage, ...prev] : prev;
          });
          
          if (tts.isSupported) {
             if (stt.isListening) { 
                stt.stopListening();
             }
            tts.speak(welcomeText, currentLanguage, welcomeMessageId);
            setMessages(prev => prev.map(m => m.id === welcomeMessageId ? {...m, isSpoken: true} : m));
          }
          setHasWelcomedForSession(prev => ({ ...prev, [currentLanguage]: true }));
        }
      });
    } else {
        setHasWelcomedForSession({ 'en-US': false, 'ne-NP': false, 'hi-IN': false });
        if (stt.isListening) stt.stopListening();
        tts.stop();
    }
  }, [isOpen, currentLanguage, initializeChat, tts, stt, hasWelcomedForSession]);


  // Effect for scrolling to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect for auto-TTS of new bot messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'bot' && !lastMessage.isLoading && !lastMessage.isSpoken && tts.isSupported) {
      if (tts.currentMessageId !== lastMessage.id ) { 
         if (stt.isListening) {
           stt.stopListening(); 
         }
         tts.speak(lastMessage.text, lastMessage.language, lastMessage.id);
         setMessages(prev => prev.map(m => m.id === lastMessage.id ? {...m, isSpoken: true} : m));
      }
    }
  }, [messages, tts, stt]);
  
  // Effect to stop STT if TTS starts playing (for any message)
  useEffect(() => {
    if (tts.isPlaying && tts.currentMessageId && stt.isListening) {
      stt.stopListening(); 
    }
  }, [tts.isPlaying, tts.currentMessageId, stt]);


  // Effect for handling STT transcript
  useEffect(() => {
    if (stt.isListening && stt.transcript) {
        setInputValue(stt.transcript); 
    }
  }, [stt.transcript, stt.isListening]);

  
  const handleSendMessage = useCallback(async (options: { textOverride?: string; isVoice?: boolean } = {}) => {
    const { textOverride, isVoice: isVoiceInput = false } = options;
    const textToSend = (textOverride ?? inputValue).trim();

    if (!textToSend || isLoading) return;
    
    let currentChatSession = geminiChat;
    if (!currentChatSession) {
      currentChatSession = await initializeChat(currentLanguage);
      if (!currentChatSession) {
         setError("Chatbot is not initialized. Please try again or check API Key.");
         return;
      }
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage,
    };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue(''); 
    if (isVoiceInput) {
        stt.setTranscript(''); 
    }
    setIsLoading(true);
    setError(null);
    
    const loadingBotMessageId = `bot-loading-${Date.now()}`;
    const loadingBotMessage: ChatMessage = {
      id: loadingBotMessageId,
      text: "Thinking...",
      sender: 'bot',
      timestamp: new Date(),
      language: currentLanguage,
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingBotMessage]);

    try {
      const response: GenerateContentResponse = await currentChatSession.sendMessage({ message: textToSend });
      
      const botResponseText = response.text;
      const botMessage: ChatMessage = {
        id: `bot-response-${Date.now()}`, 
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage,
        isSpoken: false, 
      };
      setMessages(prev => prev.map(msg => msg.id === loadingBotMessageId ? botMessage : msg ));

    } catch (err: any) {
      console.error("Error sending message to Gemini:", err);
      const errorMessageText = `Sorry, I encountered an error. ${err.message || 'Please try again.'}`;
       const errorBotMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        text: errorMessageText,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage,
        isSpoken: false, 
      };
      setMessages(prev => prev.map(msg => msg.id === loadingBotMessageId ? errorBotMessage : msg ));
      setError(errorMessageText);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, geminiChat, currentLanguage, stt, initializeChat, API_KEY]);


  const handleAutoSendFromVoice = useCallback((finalTranscript: string) => {
    if (finalTranscript.trim()) {
      handleSendMessage({ textOverride: finalTranscript, isVoice: true });
    }
  }, [handleSendMessage]); 

  useEffect(() => {
    stt.setOnFinalTranscript(handleAutoSendFromVoice);
    return () => stt.setOnFinalTranscript(null); 
  }, [stt, handleAutoSendFromVoice]);


  const handleDeleteChat = () => {
    setMessages([]);
    tts.stop();
    if(stt.isListening) stt.stopListening();
    stt.setTranscript('');
    setInputValue('');
    setHasWelcomedForSession({ 'en-US': false, 'ne-NP': false, 'hi-IN': false }); 
    initializeChat(currentLanguage).then(chatSession => { 
        if (chatSession) {
             const systemMessageId = `sys-clear-${Date.now()}`;
             const systemMessageText = `Chat history cleared. ${WELCOME_MESSAGES[currentLanguage].split('.')[0]}. How can I help?`;
             const systemMessage: ChatMessage = {
                id: systemMessageId,
                text: systemMessageText,
                sender: 'system',
                timestamp: new Date(),
                language: currentLanguage,
            };
            setMessages([systemMessage]);
         }
    }); 
    setError(null);
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    setCurrentLanguage(newLang);
    tts.stop(); 
    if(stt.isListening) stt.stopListening(); 
    setHasWelcomedForSession(prev => ({ ...prev, [currentLanguage]: false, [newLang]: false }));
    
    initializeChat(newLang).then(() => { 
        const systemMessageId = `lang-change-${Date.now()}`;
        const systemMessageText = `Language changed to ${SUPPORTED_LANGUAGES_MAP[newLang].name}.`;
        const systemMessage: ChatMessage = {
          id: systemMessageId,
          text: systemMessageText,
          sender: 'system',
          timestamp: new Date(),
          language: newLang,
        };
        setMessages(prev => [...prev.filter(m => !m.id.startsWith('welcome-')), systemMessage]); 
    });
  };

  const toggleVoiceInput = () => {
    if (stt.isListening) {
      stt.stopListening(); 
    } else {
      if (tts.isPlaying) {
        tts.stop();
      }
      stt.startListening(currentLanguage);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-24 right-6 md:right-8 md:bottom-8 z-40 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px]
                  bg-primary-light dark:bg-primary-dark shadow-2xl rounded-xl 
                  flex flex-col overflow-hidden border border-gray-300 dark:border-gray-600
                  ${isOpen ? 'animate-slideInUp' : 'animate-slideOutDown'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-title"
    >
      <header className="p-4 bg-secondary-light dark:bg-secondary-dark border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
        <h2 id="chatbot-title" className="text-lg font-semibold text-text-light dark:text-text-dark">Nischal's AI Assistant</h2>
        <div className="flex items-center space-x-2">
          <button onClick={handleDeleteChat} title="Delete Chat" className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ion-icon name="trash-outline" class="text-xl text-text-light dark:text-text-dark"></ion-icon>
          </button>
          <select 
            value={currentLanguage} 
            onChange={handleLanguageChange}
            className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs focus:ring-accent dark:focus:ring-accent-dark focus:border-accent dark:focus:border-accent-dark"
            aria-label="Select language"
          >
            {Object.values(SUPPORTED_LANGUAGES_MAP).map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <button onClick={onClose} title="Close Chat" className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ion-icon name="close-outline" class="text-2xl text-text-light dark:text-text-dark"></ion-icon>
          </button>
        </div>
      </header>

      {error && <div className="p-2 text-center text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 text-xs">{error}</div>}
      
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-primary-light dark:bg-primary-dark">
        {messages.map(msg => (
          msg.sender === 'system' ? 
          <div key={msg.id} className="text-center my-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{msg.text}</span>
          </div>
          :
          <ChatMessageItem key={msg.id} message={msg} tts={tts} theme={theme} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {stt.isAvailable && stt.isListening && (
        <div className="px-4 py-1 text-xs text-accent dark:text-accent-dark">Listening... Speak now. (Click mic to send)</div>
      )}
       {stt.isAvailable && stt.error && (
        <div className="px-4 py-1 text-xs text-red-500">Mic Error: {stt.error}</div>
      )}

      <footer className="p-3 border-t border-gray-300 dark:border-gray-600 bg-secondary-light dark:bg-secondary-dark">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage({ isVoice: false }); }} className="flex items-center space-x-2">
          {stt.isAvailable && ( 
             <button 
              type="button" 
              onClick={toggleVoiceInput}
              title={stt.isListening ? "Stop Listening & Send" : "Start Voice Input"}
              className={`p-2.5 rounded-lg ${stt.isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'} transition-colors`}
              aria-label={stt.isListening ? "Stop voice input and send message" : "Start voice input"}
            >
              <ion-icon name={stt.isListening ? "mic-off-outline" : "mic-outline"} class={`text-xl ${stt.isListening ? 'text-white' : 'text-text-light dark:text-text-dark'}`}></ion-icon>
            </button>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type or speak your message..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-500 bg-primary-light dark:bg-gray-600 text-text-light dark:text-text-dark focus:ring-1 focus:ring-accent dark:focus:ring-accent-dark focus:border-accent dark:focus:border-accent-dark transition-colors"
            disabled={isLoading && !stt.isListening} 
            aria-label="Chat input"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-lg bg-accent dark:bg-accent-dark text-white hover:bg-green-600 dark:hover:bg-green-500 disabled:opacity-50 transition-colors"
            aria-label="Send message"
          >
            <ion-icon name="send-outline" class="text-xl"></ion-icon>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatbotWindow;
