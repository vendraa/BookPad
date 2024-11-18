import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


Router.future = {
  v7_startTransition: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (window.confirm('Versi baru tersedia. Muat ulang untuk pembaruan?')) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: () => console.log('Service Worker berhasil didaftarkan!'),
});

reportWebVitals();
