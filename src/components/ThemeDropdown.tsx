import React, { useState } from "react";

interface ThemeDropdownProps {
  onThemeChange: (theme: string) => void;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>("light");
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "synthwave",
    "retro",
    "valentine",
    "aqua",
    "winter",
  ];

  const handleChange = (theme: string) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
    setIsOpen(false);
  };

  const getThemeColorClass = (theme: string) => {
    switch (theme) {
      case "light":
        return "text-gray-800";
      case "dark":
        return "text-gray-200";
      case "cupcake":
        return "text-pink-500";
      case "bumblebee":
        return "text-yellow-500";
      case "emerald":
        return "text-green-500";
      case "synthwave":
        return "text-purple-500";
      case "retro":
        return "text-orange-500";
      case "valentine":
        return "text-red-500";
      case "aqua":
        return "text-teal-500";
      case "winter":
        return "text-blue-500";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="relative">
      <button
        className="btn flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={getThemeColorClass(selectedTheme)}>
          {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <ul className="dropdown-content bg-base-300 rounded-box z-10 mt-2 absolute right-0 w-52 p-2 shadow-lg transition-opacity opacity-100">
          {themes.map((theme) => (
            <li key={theme} className="hover:bg-base-200 rounded">
              <button
                className={`btn btn-ghost w-full text-left ${getThemeColorClass(
                  theme
                )}`}
                onClick={() => handleChange(theme)}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeDropdown;
