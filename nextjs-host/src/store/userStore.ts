import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserSearchItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  score: number;
}

interface SearchState {
  query: string;
  users: UserSearchItem[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  selectedUsername: string | null;
  currentPage: number;
  perPage: number;
}

interface SearchActions {
  setQuery: (query: string) => void;
  setUsers: (users: UserSearchItem[], totalCount: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedUsername: (username: string | null) => void;
  setCurrentPage: (page: number) => void;
  reset: () => void;
}

const initialState: SearchState = {
  query: '',
  users: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  selectedUsername: null,
  currentPage: 1,
  perPage: 12,
};

export const useUserStore = create<SearchState & SearchActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setQuery: (query: string) => set({ query, currentPage: 1 }),

      setUsers: (users: UserSearchItem[], totalCount: number) =>
        set({ users, totalCount, error: null }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error, users: [], totalCount: 0 }),

      setSelectedUsername: (selectedUsername: string | null) =>
        set({ selectedUsername }),

      setCurrentPage: (currentPage: number) => set({ currentPage }),

      reset: () => set(initialState),
    }),
    { name: 'user-search-store' }
  )
);
