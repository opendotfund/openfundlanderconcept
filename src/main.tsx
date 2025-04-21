import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { 
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  embeddedWallet,
  localWallet,
  trustWallet,
  rainbowWallet
} from '@thirdweb-dev/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Extend Window interface to include Phantom
declare global {
  interface Window {
    phantom?: {
      solana?: {
        connect: () => Promise<any>;
        isPhantom: boolean;
      };
    };
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
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
      supportedWallets={[
        phantomWallet({ recommended: true }),
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple"],
          },
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        rainbowWallet(),
        localWallet()
      ]}
      autoConnect={false}
      dAppMeta={{
        name: "OpenFund",
        description: "Decentralized Fund Management Platform",
        logoUrl: window.location.origin + "/favicon.ico",
        url: window.location.origin,
      }}
      queryClient={queryClient}
    >
      <App />
    </ThirdwebProvider>
  </QueryClientProvider>
);
