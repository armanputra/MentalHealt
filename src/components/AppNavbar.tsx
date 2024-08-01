import React, { useState, useEffect } from "react";
import ThemeDropdown from "./ThemeDropdown";

const AppNavbar: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="navbar bg-primary text-primary-content">
        
      <div className="flex-1">
        <a className="text-xl font-bold">Mental Health App</a>
      </div>
      <div className="relative">
        <ThemeDropdown onThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};

export default AppNavbar;
