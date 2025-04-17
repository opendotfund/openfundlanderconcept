
import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Apply the saved theme
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
    } else {
      // Initialize with dark mode
      localStorage.setItem('theme', 'dark');
    }

    // Mark that the user has visited before
    localStorage.setItem('hasVisitedBefore', 'true');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Dispatch theme-change event
    const event = new Event('theme-change');
    window.dispatchEvent(event);
    
    // Show toast notification
    toast.success(newMode ? "Dark mode activated" : "Light mode activated");
  };

  return (
    <Toggle 
      pressed={isDarkMode} 
      onPressedChange={toggleTheme} 
      aria-label="Toggle theme"
      className={cn(
        "rounded-full w-8 h-8 p-1.5 relative z-[100]", 
        className
      )}
      ref={toggleRef}
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
