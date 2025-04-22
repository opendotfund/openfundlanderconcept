import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { thirdwebConfig } from './config/thirdweb';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebProvider 
      clientId={thirdwebConfig.clientId}
      supportedChains={thirdwebConfig.supportedChains}
      dAppMeta={{
        name: "OpenFund",
        description: "Decentralized Fund Management Platform",
        logoUrl: window.location.origin + "/favicon.ico",
        url: window.location.origin,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
