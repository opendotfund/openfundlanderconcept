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
<<<<<<< HEAD
=======
import { useAddress, useConnectionStatus, useDisconnect, useWallet } from '@thirdweb-dev/react';
import WalletConnectWrapper from './WalletConnectWrapper';

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
>>>>>>> feature/wallet-connection

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade' },
    { name: 'Start a Fund', href: '/fund' },
    { name: 'Explore Funds', href: '/explore' },
    { name: 'My Assets', href: '/my-assets' },
  ];
  
=======
  const { user, signOut } = useAuth();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const disconnect = useDisconnect();
  const wallet = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const truncateAddress = (addr: string | undefined) => {
    if (!addr) return "Connect";
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      if (!wallet) {
        console.error("No wallet available");
        return;
      }
      await wallet.connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

>>>>>>> feature/wallet-connection
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const navigateToAccount = (tab: string) => {
    navigate(`/account?tab=${tab}`);
    setIsMenuOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade' },
    { name: 'Start a Fund', href: '/fund' },
    { name: 'Explore Funds', href: '/explore' },
    { name: 'My Assets', href: '/my-assets' },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 bg-card px-6 py-2 rounded-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <ThemeToggle />
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-foreground hover:text-foreground">
                      <Avatar className="h-8 w-8 bg-muted">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.email?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>My Account</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('portfolio')}>
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>My Portfolio</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('kyc')}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Complete KYC</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('referral')}>
                      <Star className="mr-2 h-4 w-4" />
                      <span>Referrals</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => navigate('/auth')}>
                    Login
                  </Button>
                  <Button onClick={() => navigate('/auth')} className="text-primary-foreground">
                    Sign Up
                  </Button>
<<<<<<< HEAD
=======
                  <WalletConnectWrapper />
>>>>>>> feature/wallet-connection
                </div>
              )}
              
              <Button variant="outline" className="border-primary text-primary">
                Connect
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle className="w-8 h-8 p-1.5 ml-3" />
            {!user && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
            )}
            <button
              type="button"
              className="text-gray-400 hover:text-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-2xl bg-card mt-2 mx-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex items-center px-3">
                  <Avatar className="h-10 w-10 bg-muted">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-base font-medium text-foreground">My Account</div>
                    <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => navigateToAccount('profile')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigateToAccount('portfolio')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    My Portfolio
                  </button>
                  <button
                    onClick={() => navigateToAccount('kyc')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Complete KYC
                  </button>
                  <button
                    onClick={() => navigateToAccount('referral')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Referrals
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
<<<<<<< HEAD
              <div className="mt-4 px-3">
                <Button 
                  className="w-full mb-2"
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
=======
              <div className="pt-4 pb-3 border-t border-border">
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  >
                    Sign Up
                  </button>
                  <div className="px-3 py-2">
                    <WalletConnectWrapper />
                  </div>
                </div>
>>>>>>> feature/wallet-connection
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
