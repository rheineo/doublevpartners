const GITHUB_API_BASE = 'https://api.github.com';

interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchItem[];
}

interface UserSearchItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  score: number;
}

interface ApiError {
  message: string;
  documentation_url?: string;
}

export async function searchUsers(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<SearchResult> {
  if (!query.trim()) {
    return { total_count: 0, incomplete_results: false, items: [] };
  }

  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getUserByUsername(username: string) {
  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}
