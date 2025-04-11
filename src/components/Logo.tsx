
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ size = 'md' }: LogoProps) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`open-fund-text flex items-center ${sizes[size]}`}>
      <div className="mr-1">
        <span>OPEN</span>
        <span>FUND</span>
      </div>
      {size !== 'sm' && (
        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center animate-glow transition-colors duration-300">
          <div className="w-3 h-3 bg-primary rounded-full transition-colors duration-300"></div>
        </div>
      )}
    </div>
  );
};

export default Logo;
