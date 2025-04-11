
import React, { useState } from 'react';
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
  CheckCircle
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigation = [
    { name: 'OpenFund Home', href: '/' },
    { name: 'Trade on OpenFund', href: '/trade' },
    { name: 'Start an OpenFund', href: '/fund' },
    { name: 'Explore OpenFunds', href: '/explore' },
    { name: 'My OpenFund Assets', href: '/my-assets' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const navigateToAccount = (tab: string) => {
    navigate(`/account?tab=${tab}`);
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-card border-b border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" aria-label="OpenFund Home">
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-foreground hover:text-foreground">
                    <Avatar className="h-8 w-8 bg-muted">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span>My OpenFund Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My OpenFund Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>OpenFund Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('portfolio')}>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>My OpenFund Portfolio</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('kyc')}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Complete OpenFund KYC</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>OpenFund Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateToAccount('referral')}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>OpenFund Referrals</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out from OpenFund</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="border-primary text-primary">
                Connect to OpenFund
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-400 hover:text-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
      
      {/* Mobile menu */}
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
            <div 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => navigateToAccount('profile')}
            >
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2 bg-muted">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                My OpenFund Account
              </div>
            </div>
            <div 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => navigateToAccount('kyc')}
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete OpenFund KYC
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Connect to OpenFund
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
