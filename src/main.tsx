import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// ============ Zanderio Chatbot Widget ============
(function loadZanderio() {
  if (document.querySelector('script[src*="zanderio"]')) return;

  const script = document.createElement('script');
  script.src = 'https://cdn.zanderio.ai/widget/loader.js';
  script.setAttribute('data-id', 'wdg_Zz3D7EKlMrEptb5oCZ7GEFdX'); // 👈 NAYA ID
  script.async = true;

  script.onload = () => console.log('✅ Zanderio loaded');
  script.onerror = () => console.error('❌ Zanderio FAILED');

  document.body.appendChild(script);
})();