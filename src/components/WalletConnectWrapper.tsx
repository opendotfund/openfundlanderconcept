import React, { useEffect } from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';

interface WalletConnectWrapperProps {
  className?: string;
  onClose?: () => void;
}

const WalletConnectWrapper: React.FC<WalletConnectWrapperProps> = ({ className, onClose }) => {
  const address = useAddress();

  // Call onClose when address changes (user connects or disconnects)
  useEffect(() => {
    if (onClose && address) {
      // Small delay to allow the wallet connection to complete
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [address, onClose]);

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