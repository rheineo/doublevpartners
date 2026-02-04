// Domain entities for GitHub Users Application

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchItem[];
}

export interface UserSearchItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  score: number;
}

export interface Follower {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface ApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}
