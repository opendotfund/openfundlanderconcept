
import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Apply the saved theme
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
    } else {
      // Initialize with dark mode on first load
      localStorage.setItem('theme', 'dark');
    }

    // If this is the first visit, highlight the theme toggle and switch to light mode
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      setIsTransitioning(true);
      
      // Set a timeout to switch to light mode after the animation
      const timer = setTimeout(() => {
        setIsDarkMode(false);
        localStorage.setItem('theme', 'light');
        
        // Dispatch theme-change event
        const event = new Event('theme-change');
        window.dispatchEvent(event);
        
        // Wait a moment before removing the transitioning state
        setTimeout(() => {
          setIsFirstVisit(false);
          setIsTransitioning(false);
          localStorage.setItem('hasVisitedBefore', 'true');
          toast.success("Welcome! We've switched to light mode for you");
        }, 600);
      }, 3000);
      
      return () => clearTimeout(timer);
    }

    // Mark that the user has visited before
    localStorage.setItem('hasVisitedBefore', 'true');
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Dispatch theme-change event
    const event = new Event('theme-change');
    window.dispatchEvent(event);
    
    // Remove transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      toast.success(newMode ? "Dark mode activated" : "Light mode activated");
    }, 600);
  };

  return (
    <>
      {(isFirstVisit || isTransitioning) && (
        <div className="theme-transition-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] pointer-events-none" />
      )}
      <Toggle 
        pressed={isDarkMode} 
        onPressedChange={toggleTheme} 
        aria-label="Toggle theme"
        className={cn(
          "rounded-full w-10 h-10 p-2.5 relative z-[100]", 
          { 'theme-toggle-highlight': isFirstVisit },
          className
        )}
        ref={toggleRef}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        {isFirstVisit && (
          <span className="absolute -inset-2 animate-pulse rounded-full ring-4 ring-primary"></span>
        )}
      </Toggle>
    </>
  );
};

export default ThemeToggle;
