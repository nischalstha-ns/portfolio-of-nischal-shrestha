
import { useState, useCallback, useEffect, useRef } from 'react';
import { SpeechRecognitionControls } from '../types';

const useSpeechRecognition = (): SpeechRecognitionControls => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSupported, setIsSupported] = useState(true); // Assume supported until an error like 'not-allowed'
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(''); // For live display (interim + final)
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>(''); // Accumulates only final parts
  const onFinalTranscriptCallbackRef = useRef<((transcript: string) => void) | null>(null);
  const explicitStopRef = useRef<boolean>(false); // To distinguish manual stop from auto-stop/error


  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setIsAvailable(true);
      recognitionRef.current = new SpeechRecognitionAPI();
    } else {
      setIsAvailable(false);
      setIsSupported(false); // Definitely not supported if API is absent
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  const setOnFinalTranscript = useCallback((callback: ((transcript: string) => void) | null) => {
    onFinalTranscriptCallbackRef.current = callback;
  }, []);

  const handleSetTranscript = useCallback((newTranscript: string) => {
    setTranscript(newTranscript);
    if (!newTranscript) { 
        finalTranscriptRef.current = ''; // Clear accumulator if display transcript is cleared
    }
  }, []);

  const startListening = useCallback((lang: string) => {
    if (!isAvailable || isListening || !recognitionRef.current) return;
    
    finalTranscriptRef.current = ''; 
    setTranscript(''); 
    setError(null);
    setIsSupported(true); // Reset support status on new attempt
    explicitStopRef.current = false;
    
    const rec = recognitionRef.current;
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = true; 

    rec.onstart = () => setIsListening(true);
    
    rec.onend = () => {
        setIsListening(false);
        // Only trigger auto-send if it wasn't an explicit stop that already handled it,
        // or if it's an auto-stop (e.g. timeout by browser) and there's content.
        if (!explicitStopRef.current && finalTranscriptRef.current.trim() && onFinalTranscriptCallbackRef.current) {
            onFinalTranscriptCallbackRef.current(finalTranscriptRef.current.trim());
        }
        finalTranscriptRef.current = ''; // Clear after processing or if it was an error/no-speech end
        // Do not clear transcript (display) here, let user see what was captured or send it.
    };
    
    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('SpeechRecognition.onerror', event.error, event.message);
      let errMessage = event.message || event.error;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errMessage = "Microphone access denied. Please allow it in browser settings.";
        setIsSupported(false);
      } else if (event.error === 'no-speech') {
        errMessage = "No speech detected. Please try speaking louder or closer to the mic.";
      } else if (event.error === 'aborted') {
        errMessage = "Voice input aborted. Try again."; // Often happens if mic is taken by another app or permissions change
      } else if (event.error === 'network') {
        errMessage = "Network error with speech service. Check connection.";
      } else {
        errMessage = `Voice input error: ${event.error}`;
      }
      setError(errMessage);
      // onend will handle setIsListening(false)
    };
    
    rec.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscriptChunk = '';
      let currentFinalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const segment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          currentFinalTranscript += segment + ' '; // Add space after each final segment
        } else {
          interimTranscriptChunk += segment;
        }
      }
      finalTranscriptRef.current = currentFinalTranscript.trim(); // Store accumulated final parts
      setTranscript(finalTranscriptRef.current + (interimTranscriptChunk ? (finalTranscriptRef.current ? ' ' : '') + interimTranscriptChunk : '')); // Display final + current interim
    };
    
    try {
        rec.start();
    } catch (e: any) {
        console.error("Error starting speech recognition:", e);
        setError(`Could not start voice input: ${e.message}`);
        setIsListening(false);
        setIsSupported(false); // If start fails, likely not supported or misconfigured
    }

  }, [isAvailable, isListening]);

  const stopListening = useCallback(() => {
    if (!isAvailable || !isListening || !recognitionRef.current) return;
    
    explicitStopRef.current = true; // Mark that this is a manual stop
    recognitionRef.current.stop(); // This will trigger 'onend'
    
    // Process final transcript immediately on manual stop
    if (finalTranscriptRef.current.trim() && onFinalTranscriptCallbackRef.current) {
        onFinalTranscriptCallbackRef.current(finalTranscriptRef.current.trim());
    }
    // finalTranscriptRef.current = ''; // Clear after sending
    // setTranscript(''); // Optionally clear display transcript or leave it for sending
     // onend will set isListening to false.
  }, [isAvailable, isListening]);

  return { 
    startListening, 
    stopListening, 
    transcript, 
    isListening, 
    isSupported, 
    error, 
    setTranscript: handleSetTranscript, 
    isAvailable,
    onFinalTranscript: onFinalTranscriptCallbackRef.current, // Expose for direct call if needed (though primarily used internally)
    setOnFinalTranscript
  };
};
export default useSpeechRecognition;
