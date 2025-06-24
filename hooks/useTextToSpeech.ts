
import { useState, useCallback, useEffect, useRef } from 'react';
import { TextToSpeechControls } from '../types';

const useTextToSpeech = (): TextToSpeechControls => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const browserIsSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    setIsSupported(browserIsSupported);

    return () => { 
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      utteranceRef.current = null;
    };
  }, []);

  const resetState = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentMessageId(null);
    utteranceRef.current = null;
  }, []);


  const speak = useCallback((text: string, lang: string, messageIdToPlay: string) => {
    if (!isSupported || !text) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); 
      // If cancelling the same message that's being requested to play,
      // it might need a slight delay or careful state management to avoid race conditions.
      // For now, cancelling and re-speaking should work for restarting.
      if (utteranceRef.current && utteranceRef.current.text === text && currentMessageId === messageIdToPlay) {
        // Trying to play the same message again immediately after stopping it might sometimes be problematic
        // However, the new utterance should override.
      }
    }
    
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = lang;
    
    newUtterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentMessageId(messageIdToPlay); // Ensure currentMessageId is set on start
    };
    newUtterance.onpause = () => {
        setIsPlaying(true); // Still "playing" in the sense that it's active for this message
        setIsPaused(true);
    };
    newUtterance.onresume = () => {
        setIsPlaying(true);
        setIsPaused(false);
    };
    newUtterance.onend = () => {
      resetState();
    };
    newUtterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      resetState();
    };
    
    utteranceRef.current = newUtterance;
    setCurrentMessageId(messageIdToPlay); // Set ID before speaking call
    window.speechSynthesis.speak(newUtterance);
  }, [isSupported, resetState, currentMessageId]);

  const pause = useCallback(() => {
    if (isSupported && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      // onpause callback will set isPaused and isPlaying states
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      // onresume callback will set isPaused and isPlaying states
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // This will trigger 'onend' which resets state
    } else {
       // If not speaking but some state is stuck (e.g. paused then component re-render)
       resetState();
    }
  }, [isSupported, resetState]);

  return { 
    speak, 
    pause, 
    resume, 
    stop, 
    isPlaying, 
    isPaused, 
    isSupported,
    currentMessageId 
  };
};

export default useTextToSpeech;
