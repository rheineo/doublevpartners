'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  // Initialize input with current search query
  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setInputValue(currentQuery);
  }, [searchParams]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      router.push('/');
      return;
    }

    const params = new URLSearchParams();
    params.set('q', searchQuery);
    params.set('page', '1');
    
    router.push(`/?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar usuarios de GitHub..."
          className="w-full pl-12 pr-32 py-4 bg-github-light border border-github-border rounded-lg 
                     text-github-text placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-github-link focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-github-green 
                     text-white font-medium rounded-md hover:bg-green-600 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-github-dark"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
