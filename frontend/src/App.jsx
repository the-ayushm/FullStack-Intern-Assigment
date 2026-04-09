import { useEffect, useState } from 'react';
import { fetchAndStorePosts } from './lib/api';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PostCard } from './components/PostCard';
import { PostSkeleton } from './components/PostSkeleton';
import { Pagination } from './components/Pagination';
import { EmptyState } from './components/EmptyState';
import { useDebounce } from './hooks/useDebounce';
import { usePosts } from './hooks/usePosts';
import { useSearchSocket } from './hooks/useSearchSocket';

const PAGE_SIZE = 12;

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const debouncedQuery = useDebounce(query, 350);

  const { posts, pagination, isLoading, error, refresh } = usePosts({ page, limit: PAGE_SIZE });
  const { results: searchResults, search, isConnected, isSearching, error: searchError } = useSearchSocket();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchAndStorePosts();
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const showingSearchResults = debouncedQuery.trim().length > 0;
  const visiblePosts = showingSearchResults ? searchResults : posts;
  const loading = showingSearchResults ? isSearching : isLoading;
  const statusMessage = searchError || error;

  return (
    <main className="min-h-screen bg-radial-glow px-4 py-8 text-paper sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="hero-grid glass-panel rounded-[2rem] p-5 shadow-[0_25px_120px_rgba(0,0,0,0.35)] sm:p-8">
          <Header isConnected={isConnected} onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <SearchBar value={query} onChange={setQuery} />
          <div className="glass-panel rounded-3xl px-6 py-4 text-sm leading-6 text-white/70">
            <p className="font-semibold text-paper">Live search via Socket.io</p>
            <p>Typing updates the result set in real time against MongoDB, with debounce to keep requests calm.</p>
          </div>
        </section>

        {statusMessage ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {statusMessage}
          </div>
        ) : null}

        {loading ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </section>
        ) : visiblePosts.length > 0 ? (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-paper">
                  {showingSearchResults ? 'Search results' : 'Latest stored posts'}
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  {showingSearchResults
                    ? `Showing ${visiblePosts.length} result${visiblePosts.length === 1 ? '' : 's'} for "${debouncedQuery.trim()}"`
                    : `Page ${pagination.page} of ${pagination.totalPages} · ${pagination.total} total posts`}
                </p>
              </div>
              {!showingSearchResults ? (
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
              ) : null}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visiblePosts.map((post) => (
                <PostCard key={post._id || post.id || post.externalId} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            title={showingSearchResults ? 'No results found' : 'No posts available'}
            description={
              showingSearchResults
                ? 'Try a different keyword. Search matches against both the title and body fields.'
                : 'The backend has not stored any posts yet. Use the sync button or the fetch endpoint to seed the database.'
            }
          />
        )}
      </div>
    </main>
  );
}

export default App;
