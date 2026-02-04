'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import { SearchUsersResult } from '../app/actions/github';

interface UserListServerProps {
  initialData: SearchUsersResult;
  initialQuery: string;
  initialPage: number;
}

export default function UserListServer({ 
  initialData, 
  initialQuery, 
  initialPage 
}: UserListServerProps) {
  const { 
    users, 
    totalCount, 
    isLoading, 
    error, 
    query, 
    currentPage,
    setQuery,
    setUsers,
    setLoading,
    setError,
    setCurrentPage
  } = useUserStore();

  // Initialize store with server data
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setUsers(initialData.items, initialData.total_count);
      setCurrentPage(initialPage);
    }
  }, [initialData, initialQuery, initialPage, setQuery, setUsers, setCurrentPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
          <svg
            className="w-8 h-8 text-red-500"
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
        <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-github-light mb-4">
          <svg
            className="w-10 h-10 text-gray-500"
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
        <h3 className="text-xl font-semibold text-github-text mb-2">
          Buscar Usuarios de GitHub
        </h3>
        <p className="text-gray-500">
          Ingresa un nombre de usuario para comenzar
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-light mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-github-text mb-2">
          No se encontraron usuarios
        </h3>
        <p className="text-gray-500">
          Intenta con otro término de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-sm text-gray-400">
        Se encontraron <span className="text-github-link font-semibold">{totalCount.toLocaleString()}</span> usuarios
        que coinciden con &quot;<span className="text-white">{query}</span>&quot;
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
      <Pagination 
        totalCount={totalCount} 
        currentPage={currentPage} 
        perPage={12} 
      />
    </div>
  );
}
