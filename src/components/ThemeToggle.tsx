
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize with dark mode on first load
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Toggle 
      pressed={isDarkMode} 
      onPressedChange={toggleTheme} 
      aria-label="Toggle theme"
      className="rounded-full w-10 h-10 p-2.5"
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
