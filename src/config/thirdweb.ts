import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ChainId } from "@thirdweb-dev/sdk";

export const thirdwebConfig = {
  clientId: process.env.VITE_THIRDWEB_CLIENT_ID,
  supportedChains: [
    {
      rpc: ["https://ethereum.rpc.thirdweb.com"],
      chainId: 1, // Ethereum Mainnet
      nativeCurrency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: 18
      },
      slug: "ethereum",
      name: "Ethereum",
      chain: "ethereum",
      shortName: "eth",
      testnet: false
    },
    {
      rpc: ["https://polygon.rpc.thirdweb.com"],
      chainId: 137, // Polygon Mainnet
      nativeCurrency: {
        symbol: "MATIC",
        name: "Polygon",
        decimals: 18
      },
      slug: "polygon",
      name: "Polygon",
      chain: "polygon",
      shortName: "matic",
      testnet: false
    },
    {
      rpc: ["https://solana.rpc.thirdweb.com"],
      chainId: 101, // Solana Mainnet
      nativeCurrency: {
        symbol: "SOL",
        name: "Solana",
        decimals: 9
      },
      slug: "solana",
      name: "Solana",
      chain: "solana",
      shortName: "sol",
      testnet: false
    }
  ],
  supportedWallets: ["metamask", "walletconnect", "phantom"],
  whitelistedDomains: [
    "www.openfund.online",
    "openfund.online",
    "localhost:3000",
    "localhost:3001",
    "localhost:3002"
  ]
};

export const initializeThirdWeb = () => {
  return new ThirdwebSDK("ethereum", {
    clientId: thirdwebConfig.clientId,
    supportedChains: thirdwebConfig.supportedChains,
  });
}; 