import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const disconnect = useDisconnect();
  const wallet = useWallet();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const truncateAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      signOut();
    } catch (error) {
      console.error('Error disconnecting:', error);
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
        <WalletConnectWrapper onClose={() => setIsMobileMenuOpen(false)} />
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
    <nav className={`lg:hidden fixed inset-0 bg-background z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full p-6 bg-background w-full">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <Link 
            to="/" 
            className={`text-xl font-medium ${location.pathname === '/' ? 'text-primary' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/trade" 
            className={`text-xl font-medium ${location.pathname === '/trade' ? 'text-primary' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Trade
          </Link>
          <Link 
            to="/explore-funds" 
            className={`text-xl font-medium ${location.pathname === '/explore-funds' ? 'text-primary' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore Funds
          </Link>
          <Link 
            to="/fund" 
            className={`text-xl font-medium ${location.pathname === '/fund' ? 'text-primary' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a Fund
          </Link>
          <Link 
            to="/my-assets" 
            className={`text-xl font-medium ${location.pathname === '/my-assets' ? 'text-primary' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Assets
          </Link>
          
          {connectionStatus === "connected" && address ? (
            <Button 
              variant="outline" 
              className="w-full font-mono"
              onClick={() => {
                setIsAccountModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              {truncateAddress(address)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <WalletConnectWrapper onClose={() => setIsMobileMenuOpen(false)} />
          )}
          
          {session ? (
            <div className="flex flex-col gap-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xl"
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xl"
                onClick={() => {
                  navigate('/settings');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xl text-destructive"
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => {
                navigate('/auth');
                setIsMobileMenuOpen(false);
              }} 
              variant="default" 
              className="w-full text-xl"
            >
              Sign in
            </Button>
          )}
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        
        <div className="flex-1" />

        <DesktopNav />

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="lg:hidden"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile menu */}
        <MobileNav />

        {/* Account Modal */}
        <AccountModal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          address={address}
          onDisconnect={handleDisconnect}
        />
      </div>
    </header>
  );
};

export default Navbar;
