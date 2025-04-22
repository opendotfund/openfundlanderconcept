import { QueryClient } from '@tanstack/react-query';
import { Ethereum } from '@thirdweb-dev/wallets';

declare global {
  interface Window {
    ethereum?: Ethereum;
    phantom?: {
      ethereum?: Ethereum;
      solana?: {
        connect: () => Promise<any>;
        disconnect: () => Promise<void>;
        isPhantom: boolean;
        on: (event: string, callback: (args: any) => void) => void;
        off: (event: string, callback: (args: any) => void) => void;
        request: (args: any) => Promise<any>;
      };
    };
    process: any;
    Buffer: typeof Buffer;
  }

  interface ImportMetaEnv {
    VITE_THIRDWEB_CLIENT_ID: string;
    // Add other environment variables here
  }
}

export {}; 