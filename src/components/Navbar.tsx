
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Wallet, 
  Settings, 
  ChevronDown,
  Share
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
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade' },
    { name: 'Start a Fund', href: '/fund' },
    { name: 'Explore Funds', href: '/explore' },
    { name: 'My Assets', href: '/my-assets' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <nav className="bg-openfund-gray-dark border-b border-openfund-gray-light">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? 'text-openfund-green'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                    <Avatar className="h-8 w-8 bg-openfund-gray-light">
                      <AvatarFallback className="bg-openfund-green text-openfund-gray-dark">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span>My Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-openfund-gray-medium border-openfund-gray-light text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-openfund-gray-light" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-openfund-gray-light cursor-pointer">
                    <Link to="/account" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-openfund-gray-light cursor-pointer">
                    <Link to="/account?tab=portfolio" className="flex items-center w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>My Portfolio</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-openfund-gray-light cursor-pointer">
                    <Link to="/account?tab=settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-openfund-gray-light cursor-pointer">
                    <Link to="/account?tab=referral" className="flex items-center w-full">
                      <Share className="mr-2 h-4 w-4" />
                      <span>Referrals</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-openfund-gray-light" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-openfund-gray-light cursor-pointer">
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="border-openfund-green text-openfund-green">
                Connect
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-white p-2"
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
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-openfund-green'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/account"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2 bg-openfund-gray-light">
                  <AvatarFallback className="bg-openfund-green text-openfund-gray-dark text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                My Account
              </div>
            </Link>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-openfund-green text-openfund-green"
                onClick={() => setIsMenuOpen(false)}
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
