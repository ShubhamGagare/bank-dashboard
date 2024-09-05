import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './index.css'
async function enableMocking() {
  const { worker } = await import('./mock/browser');

  return worker.start();
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
