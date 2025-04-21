import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider 
    activeChain={{
      chainId: 103,
      rpc: ["https://api.devnet.solana.com"],
      nativeCurrency: {
        name: "Solana",
        symbol: "SOL",
        decimals: 9,
      },
      shortName: "solana",
      slug: "solana",
      testnet: true,
      chain: "solana",
      name: "Solana Devnet",
    }}
    clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
  >
    <App />
  </ThirdwebProvider>
);
