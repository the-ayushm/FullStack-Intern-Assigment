import { useCallback, useEffect, useState } from 'react';
import { fetchPosts } from '../lib/api';

export const usePosts = ({ page = 1, limit = 12 } = {}) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPosts({ page, limit });
      setPosts(data.posts || []);
      setPagination(data.pagination || { page, limit, total: 0, totalPages: 1 });
    } catch (requestError) {
      setError(requestError.message || 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    pagination,
    isLoading,
    error,
    refresh: loadPosts,
  };
};
