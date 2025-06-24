
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// TypeScript declaration for ion-icon custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': {
        name: string;
        class?: string;
        id?: string;
        role?: string;
        'aria-label'?: string;
        style?: React.CSSProperties;
        src?: string;
        icon?: string;
        size?: 'small' | 'large' | string;
        color?: string; // Corresponds to CSS variable --ion-color-step-XXX or theme colors
        onClick?: (event: React.MouseEvent<HTMLElement>) => void;
      };
    }
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
