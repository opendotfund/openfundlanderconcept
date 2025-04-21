import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Wallet, 
  Settings, 
  ChevronDown,
  Share,
  Star,
  CheckCircle,
  SwitchCamera
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from './AuthContext';
import { useAddress, useConnectionStatus, useDisconnect, useWallet } from '@thirdweb-dev/react';
import WalletConnectWrapper from './WalletConnectWrapper';
import AccountModal from './AccountModal';

// Extend Window interface to include web3 wallet types
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const disconnect = useDisconnect();
  const wallet = useWallet();

  const truncateAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Desktop Navigation
  const DesktopNav = () => (
    <nav className="hidden lg:flex items-center gap-8">
      <Link to="/" className={`text-lg font-medium ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        Home
      </Link>
      <Link to="/trade" className={`text-lg font-medium ${location.pathname === '/trade' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        Trade
      </Link>
      <Link to="/explore-funds" className={`text-lg font-medium ${location.pathname === '/explore-funds' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        Explore Funds
      </Link>
      <Link to="/fund" className={`text-lg font-medium ${location.pathname === '/fund' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        Start a Fund
      </Link>
      <Link to="/my-assets" className={`text-lg font-medium ${location.pathname === '/my-assets' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        My Assets
      </Link>
      
      {connectionStatus === "connected" && address ? (
        <Button 
          variant="outline" 
          className="min-w-[140px] font-mono"
          onClick={() => setIsAccountModalOpen(true)}
        >
          {truncateAddress(address)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <WalletConnectWrapper>
          <Button variant="outline">
            Connect
          </Button>
        </WalletConnectWrapper>
      )}

      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate('/auth')} variant="default">Sign in</Button>
      )}
      <ThemeToggle />
    </nav>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <nav className={`lg:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <Link 
            to="/" 
            className={`text-xl font-medium ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/trade" 
            className={`text-xl font-medium ${location.pathname === '/trade' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsOpen(false)}
          >
            Trade
          </Link>
          <Link 
            to="/explore-funds" 
            className={`text-xl font-medium ${location.pathname === '/explore-funds' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsOpen(false)}
          >
            Explore Funds
          </Link>
          <Link 
            to="/fund" 
            className={`text-xl font-medium ${location.pathname === '/fund' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsOpen(false)}
          >
            Start a Fund
          </Link>
          <Link 
            to="/my-assets" 
            className={`text-xl font-medium ${location.pathname === '/my-assets' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsOpen(false)}
          >
            My Assets
          </Link>
          
          {connectionStatus === "connected" && address ? (
            <Button 
              variant="outline" 
              className="w-full font-mono"
              onClick={() => {
                setIsAccountModalOpen(true);
                setIsOpen(false);
              }}
            >
              {truncateAddress(address)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <WalletConnectWrapper>
              <Button variant="outline" className="w-full">
                Connect
              </Button>
            </WalletConnectWrapper>
          )}

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="default">Sign in</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex-1" />
        <DesktopNav />
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <MobileNav />
      </div>
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
