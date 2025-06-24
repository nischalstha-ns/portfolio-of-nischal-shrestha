
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Define attributes specific to ion-icon
interface IonIconCustomProps {
  name?: string;
  src?: string;
  icon?: string; // often an alias for name
  size?: 'small' | 'large' | string; // ion-icon specific size prop
  color?: string; // ion-icon specific color prop (e.g., "primary", "secondary" - not CSS style color)
  ios?: string;   // platform-specific icon variant
  md?: string;    // platform-specific icon variant
  flipRtl?: boolean;
  lazy?: boolean;
  // 'class' is a direct attribute for web components.
  // React typically uses 'className'.
  // This allows 'class' to be passed directly if needed by ion-icon.
  class?: string;
}

// Combine custom ion-icon props with standard React HTML attributes,
// omitting conflicting properties from the standard HTML attributes.
type IonIconReactProps = IonIconCustomProps & 
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'color' | 'size'>;

// Augment JSX.IntrinsicElements to include ion-icon
// This approach avoids re-declaring all standard HTML elements,
// preventing conflicts with React's built-in types.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': IonIconReactProps;
      // Standard HTML elements (div, span, etc.) will use React's default typings.
      // No need to list them all here.
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