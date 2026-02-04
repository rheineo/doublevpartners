import SearchBar from '@/components/SearchBar';
import UserListServer from '@/components/UserListServer';
import { searchUsersServer, type SearchUsersResult } from './actions/github';

interface HomePageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const query = searchParams.q || '';
  const page = parseInt(searchParams.page || '1', 10);
  
  let initialData: SearchUsersResult = { items: [], total_count: 0 };
  
  if (query.trim()) {
    try {
      initialData = await searchUsersServer(query, page);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  return (
    <div>
      <SearchBar />
      <UserListServer 
        initialData={initialData}
        initialQuery={query}
        initialPage={page}
      />
    </div>
  );
}
