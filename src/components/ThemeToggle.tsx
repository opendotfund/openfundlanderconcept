
import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
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
      applyTheme(isDark);
    } else {
      // Initialize with dark mode on first load
      applyTheme(true);
      localStorage.setItem('theme', 'dark');
    }

    // If this is the first visit, highlight the theme toggle and switch to light mode
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      
      // Set a timeout to switch to light mode after the animation
      const timer = setTimeout(() => {
        setIsDarkMode(false);
        applyTheme(false);
        localStorage.setItem('theme', 'light');
        setIsFirstVisit(false);
        localStorage.setItem('hasVisitedBefore', 'true');
        toast.success("Welcome! We've switched to light mode for you");
      }, 3000);
      
      return () => clearTimeout(timer);
    }

    // Mark that the user has visited before
    localStorage.setItem('hasVisitedBefore', 'true');
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  }, []);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      
      // Update custom CSS variables for colors
      document.documentElement.style.setProperty('--color-primary', 'var(--color-green)');
      document.documentElement.style.setProperty('--color-primary-light', 'var(--color-green-light)');
      document.documentElement.style.setProperty('--color-primary-dark', 'var(--color-green-dark)');
      document.documentElement.style.setProperty('--color-text-subdued', '#888888');
      document.documentElement.style.setProperty('--color-border', '#333333');
      document.documentElement.style.setProperty('--logo-color', '#00FF00');
      document.documentElement.style.setProperty('--logo-dot-color', '#00FF00');
      document.documentElement.style.setProperty('--glow-color', 'rgba(0, 255, 0, 0.7)');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      
      // Update custom CSS variables for colors
      document.documentElement.style.setProperty('--color-primary', 'var(--color-blue)');
      document.documentElement.style.setProperty('--color-primary-light', 'var(--color-blue-light)');
      document.documentElement.style.setProperty('--color-primary-dark', 'var(--color-blue-dark)');
      document.documentElement.style.setProperty('--color-text-subdued', '#555555');
      document.documentElement.style.setProperty('--color-border', '#e5e5e5');
      document.documentElement.style.setProperty('--logo-color', '#0EA5E9');
      document.documentElement.style.setProperty('--logo-dot-color', '#0EA5E9');
      document.documentElement.style.setProperty('--glow-color', 'rgba(14, 165, 233, 0.7)');
    }
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply theme changes
    applyTheme(newMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    toast.success(newMode ? "Dark mode activated" : "Light mode activated");
  };

  return (
    <Toggle 
      pressed={isDarkMode} 
      onPressedChange={toggleTheme} 
      aria-label="Toggle theme"
      className={`rounded-full w-10 h-10 p-2.5 relative z-10 ${isFirstVisit ? 'theme-toggle-highlight' : ''}`}
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
  );
};

export default ThemeToggle;
