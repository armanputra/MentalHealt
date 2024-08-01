import React from "react";

const AppFooter: React.FC = () => (
  <footer className="bg-gray-800 py-6 mt-10">
    <div className="container mx-auto px-6 text-center text-white">
      <p className="text-sm">&copy; © 2024 Mental Health App</p>
      <div className="mt-4 flex justify-center space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default AppFooter;
