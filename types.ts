
export type Theme = 'light' | 'dark';
export type ActiveSection = 'about' | 'resume' | 'portfolio' | 'blog' | 'contact';

export interface ContactInfo {
  type: 'email' | 'phone' | 'birthday' | 'location' | 'github';
  label: string;
  value: string;
  link?: string;
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export interface PersonalDetails {
  avatarUrl: string;
  name: string;
  title: string;
  contacts: ContactInfo[];
  socials: SocialLink[];
}

export interface NavItem {
  id: ActiveSection;
  label: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  level: number; // Percentage 0-100
  iconName?: string; 
}

export interface ResumeContent {
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Skill[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

// Chatbot specific types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  language: SupportedLanguage;
  timestamp: Date;
  isLoading?: boolean; // For bot messages while waiting for API response
  isSpoken?: boolean; // To track if a bot message has been auto-read
}

export type SupportedLanguage = 'en-US' | 'ne-NP' | 'hi-IN';

export const SUPPORTED_LANGUAGES_MAP: Record<SupportedLanguage, { name: string; code: SupportedLanguage }> = {
  'en-US': { name: 'English', code: 'en-US' },
  'ne-NP': { name: 'Nepali (नेपाली)', code: 'ne-NP' },
  'hi-IN': { name: 'Hindi (हिन्दी)', code: 'hi-IN' },
};

export interface TextToSpeechControls {
  speak: (text: string, lang: string, messageId: string) => void; // Updated signature
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentMessageId: string | null;
}

export interface SpeechRecognitionControls {
  startListening: (lang: string) => void;
  stopListening: () => void;
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  isAvailable: boolean;
  onFinalTranscript: ((transcript: string) => void) | null; // Callback for final transcript
  setOnFinalTranscript: (callback: ((transcript: string) => void) | null) => void;
}

// Ambient type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }

  interface SpeechRecognitionEventMap {
    audiostart: Event;
    audioend: Event;
    end: Event;
    error: SpeechRecognitionErrorEvent;
    nomatch: SpeechRecognitionEvent;
    result: SpeechRecognitionEvent;
    soundstart: Event;
    soundend: Event;
    speechstart: Event;
    speechend: Event;
    start: Event;
  }

  interface SpeechRecognitionStatic {
    new (): SpeechRecognition;
    prototype: SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;

    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

    abort(): void;
    start(): void;
    stop(): void;

    addEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void;
  }

  interface SpeechRecognitionErrorEventInit extends EventInit {
    error: SpeechRecognitionErrorCode;
    message?: string;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionErrorCode;
    readonly message: string;
  }
  var SpeechRecognitionErrorEvent: {
    prototype: SpeechRecognitionErrorEvent;
    new(type: string, eventInitDict: SpeechRecognitionErrorEventInit): SpeechRecognitionErrorEvent;
  };


  interface SpeechRecognitionEventInit extends EventInit {
    resultIndex?: number;
    results: SpeechRecognitionResultList;
  }
  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }
  var SpeechRecognitionEvent: {
    prototype: SpeechRecognitionEvent;
    new(type: string, eventInitDict: SpeechRecognitionEventInit): SpeechRecognitionEvent;
  };


  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [Symbol.iterator](): IterableIterator<SpeechRecognitionAlternative>;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [Symbol.iterator](): IterableIterator<SpeechRecognitionResult>;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechGrammar {
    src: string;
    weight: number;
  }
  var SpeechGrammar: {
    prototype: SpeechGrammar;
    new(): SpeechGrammar;
  };

  interface SpeechGrammarList {
    readonly length: number;
    item(index: number): SpeechGrammar;
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
    [Symbol.iterator](): IterableIterator<SpeechGrammar>;
  }
  var SpeechGrammarList: {
    prototype: SpeechGrammarList;
    new(): SpeechGrammarList;
  };
  
  type SpeechRecognitionErrorCode =
    | "aborted"
    | "audio-capture"
    | "bad-grammar"
    | "language-not-supported"
    | "network"
    | "no-speech"
    | "not-allowed"
    | "service-not-allowed";
}

// Ensure this file is treated as a module.
export {};
