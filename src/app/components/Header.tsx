'use client'

import React, { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Header: React.FC = () => {
    const [theme, setTheme] = useState<string>('light');

    // Check for stored theme in localStorage and apply it on load
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }, []);

   // Toggle between light and dark modes
    const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Remove the old theme and apply the new one
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    
    // Update state and store the new theme in localStorage
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      <div className='bg-[#181717] px-[5%] sm:px-[20%] py-4 flex justify-between items-center'>
        <h1 className='text-white font-semibold text-xl uppercase'>GitHub Profile Viewer</h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          {theme === 'light' ? 
          <div>
            <p className='hidden sm:flex'>Dark Mode</p>
            <MdDarkMode className='size-5 sm:hidden flex' />
          </div>  : 
          <div>
            <p className='hidden sm:flex'>Light Mode</p>
            <MdLightMode className='size-5 sm:hidden flex' />
          </div>
          }
        </button>
      </div>
    </div>
  );
};

export default Header;
