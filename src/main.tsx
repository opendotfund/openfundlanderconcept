import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Sepolia } from '@thirdweb-dev/chains'

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider
    activeChain={Sepolia}
    clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
  >
    <App />
  </ThirdwebProvider>
);
