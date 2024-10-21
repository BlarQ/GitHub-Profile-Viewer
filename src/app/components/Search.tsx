"use client"

import React, { useState } from 'react';

interface SearchProps {
  onSearch: (username: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <div className='px-[5%] sm:px-[20%] py-4'>
      <div className='p-4 border rounded space-y-2'>
        <div>
          <h2 className='text-3xl uppercase font-bold'>Search for users in GitHub</h2>
          <p className='text-gray-400'>Enter a Username to fetch details</p>
        </div>

        <form onSubmit={handleSearch}>
          <div className='px-2 border rounded'>
            <input
              className='w-full h-10 outline-none'
              type="text"
              placeholder="Search for a User"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit" className='mt-4 bg-[#3d444d] text-white px-4 py-2 rounded'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
