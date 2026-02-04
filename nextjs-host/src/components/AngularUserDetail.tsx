'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface AngularUserDetailProps {
  username: string;
}

export default function AngularUserDetail({ username }: AngularUserDetailProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/20 mb-3">
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-yellow-400 text-sm">
          Failed to load Angular User Detail component.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Run: cd angular-user-detail && npm start
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center py-8 bg-github-dark">
          <LoadingSpinner />
        </div>
      )}
      <iframe
        src={`http://localhost:4201/?username=${username}`}
        className="w-full border-0 bg-transparent"
        style={{ 
          minHeight: '400px',
          display: isLoading ? 'none' : 'block'
        }}
        onLoad={handleLoad}
        onError={handleError}
        title="User Detail"
      />
    </div>
  );
}
