import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './index.css'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mock/browser')
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}

const rootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(rootElement);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
}).catch(error => {
  console.error("Failed to start the mock service worker:", error);
});