'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

type UserProfile = {
  avatar_url: string;
  login: string;
  bio: string;
  location: string | null;
  public_repos: number;
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
};

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);  // Correct usage of error state
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [page, setPage] = useState(1);

  // Fetch profile and repositories
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);  // Clear any previous error

    const fetchUserProfile = async () => {
      try {
        const profileRes = await axios.get(`https://api.github.com/users/${username}`);
        setUserProfile(profileRes.data);

        const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=30&page=${page}`);
        setRepos(repoRes.data);
      } catch (err) {  // Error handling here
        console.error('An error occurred:', err)
        setError('User not found or there was an issue with the request');  // Set error message
        setUserProfile(null);  // Clear previous profile on error
        setRepos([]);  // Clear repos on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, page]);

  return (
    <div className=' dark:bg-gray-800 dark:text-white pb-4 min-h-screen'>
      {/* Header */}
      <Header />

      {/* Search Component */}
      <Search onSearch={(name) => { setUsername(name); setPage(1); }} />

      {/* Handle Loading Effect */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}  {/* Display error message */}

      {/* Display User Profile */}
      {userProfile && (
        <div className="sm:px-[20%] px-[5%]">
          <div className="p-4 border rounded grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-4">
            <div className='grid grid-cols-1 gap-1'>
              <Image
                src={userProfile.avatar_url}
                alt={userProfile.login}
                className="rounded min-w-full"
                width={500} height={500} 
              />

              <Link
                className='uppercase 
              bg-[#3d444d] 
              text-white 
              p-2 rounded 
              font-semibold 
              text-center'
                href={`https://www.github.com/${userProfile.login}`}>view profile</Link>
            </div>

            <div className='col-span-2 border rounded divide-y h-fit'>
              <h2 className="text-xl font-bold p-2">{userProfile.login}</h2>
              <p className='p-2'>{userProfile.bio || 'No bio available'}</p>
              <p className='p-2'>{userProfile.location || 'No location available'}</p>
              <p className='p-2'>Public Repositories: {userProfile.public_repos}</p>
            </div>

          </div>

          {/* Repositories Section */}
          {repos.length > 0 && (
            <div className="my-6 border rounded p-4">
              <h3 className="text-xl font-bold uppercase border-b">Repositories</h3>
              <ul>
                {repos.map((repo) => (
                  <li key={repo.name} className="border-b py-2 w-full">
                    <Link href={repo.html_url} className="text-blue-500" target="_blank">{repo.name}</Link>
                    <p>{repo.description || 'No description available'}</p>
                    <div className="text-sm">⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</div>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              {userProfile.public_repos > 30 && (
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-[#3d444d] text-white px-4 py-2 rounded"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-[#3d444d] text-white px-4 py-2 rounded"
                    onClick={() => setPage(page + 1)}
                    disabled={repos.length < 30}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
