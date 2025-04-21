import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';

interface WalletConnectWrapperProps {
  className?: string;
}

const WalletConnectWrapper: React.FC<WalletConnectWrapperProps> = ({ className }) => {
  const address = useAddress();

  const truncateAddress = (addr: string | undefined) => {
    if (!addr) return "Connect";
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <ConnectWallet 
      theme="dark"
      btnTitle={address ? truncateAddress(address) : "Connect"}
      modalTitle="Select a Wallet"
      hideTestnetFaucet={true}
      switchToActiveChain={false}
      displayBalanceToken={{
        [103]: "SOL"
      }}
      style={{
        backgroundColor: "transparent",
        border: "1px solid var(--primary)",
        color: "var(--primary)",
        height: "40px",
        minWidth: "120px",
      }}
      modalSize="wide"
      modalTitleIconUrl="/logo.svg"
      termsOfServiceUrl="https://openfund.online/terms"
      privacyPolicyUrl="https://openfund.online/privacy"
      className={className}
    />
  );
};

export default WalletConnectWrapper; 