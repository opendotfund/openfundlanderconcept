import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { Copy, LogOut, Wallet } from 'lucide-react';
import { toast } from 'sonner';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const address = useAddress();
  const disconnect = useDisconnect();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onClose();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Account</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Wallet Address Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Wallet Address</h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted p-3 font-mono text-sm">
                {address}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyAddress}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Balance Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span className="font-medium">SOL</span>
                </div>
                <span className="font-mono">0.00</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button variant="default" className="w-full">
              Deposit
            </Button>
            <Button variant="outline" className="w-full">
              Withdraw
            </Button>
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive"
              onClick={handleDisconnect}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal; 