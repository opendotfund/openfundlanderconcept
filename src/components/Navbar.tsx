
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-openfund-gray-dark border-b border-openfund-gray-light">
      <div className="container mx-auto flex justify-between items-center">
        <Logo size="md" />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white hover:text-openfund-green">Buy Fund</a>
          <a href="#" className="text-white hover:text-openfund-green">Open Fund</a>
          <a href="#" className="text-white hover:text-openfund-green">Tokenize</a>
          <a href="#" className="text-white hover:text-openfund-green">Docs</a>
          <Button className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
            Connect
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-openfund-gray-medium border-b border-openfund-gray-light">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <a href="#" className="text-white hover:text-openfund-green">Buy Fund</a>
            <a href="#" className="text-white hover:text-openfund-green">Open Fund</a>
            <a href="#" className="text-white hover:text-openfund-green">Tokenize</a>
            <a href="#" className="text-white hover:text-openfund-green">Docs</a>
            <Button className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark w-full">
              Connect
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
