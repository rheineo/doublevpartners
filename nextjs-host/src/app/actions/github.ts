'use server';

import { searchUsers } from '@/services/githubApi';

export interface SearchUsersResult {
  items: Array<{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
    score: number;
  }>;
  total_count: number;
}

export async function searchUsersServer(query: string, page: number = 1, perPage: number = 12): Promise<SearchUsersResult> {
  if (!query.trim()) {
    return { items: [], total_count: 0 };
  }

  try {
    const result = await searchUsers(query, page, perPage);
    return result;
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users');
  }
}
