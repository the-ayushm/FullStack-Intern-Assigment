import { useCallback, useEffect, useRef, useState } from 'react';
import { getSocket } from '../lib/socket';
import { searchPosts } from '../lib/api';

export const useSearchSocket = () => {
  const socketRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const fallbackSearch = useCallback(async (query) => {
    const response = await searchPosts(query);
    setResults(response?.posts || []);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleError = (payload) => {
      setError(payload?.message || 'Socket search failed');
      setIsSearching(false);
    };

    setIsConnected(socket.connected);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('search:error', handleError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('search:error', handleError);
    };
  }, []);

  const search = useCallback(async (query) => {
    const socket = socketRef.current || getSocket();

    if (!socket.connected) {
      setError(null);
      setIsSearching(true);
      try {
        await fallbackSearch(query);
      } catch (requestError) {
        setError(requestError.message || 'Search failed');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    setError(null);
    setIsSearching(true);

    const timeoutId = window.setTimeout(() => {
      setIsSearching(false);
      setError('Socket delayed, switched to API search.');
      fallbackSearch(query).catch((requestError) => {
        setError(requestError.message || 'Search failed');
        setResults([]);
      });
    }, 5000);

    socket.emit('search', { query }, (response) => {
      window.clearTimeout(timeoutId);

      if (response?.message && !response.posts) {
        setError(response.message);
        setResults([]);
      } else {
        setResults(response?.posts || []);
      }

      setIsSearching(false);
    });
  }, [fallbackSearch]);

  return {
    results,
    search,
    isConnected,
    isSearching,
    error,
  };
};
