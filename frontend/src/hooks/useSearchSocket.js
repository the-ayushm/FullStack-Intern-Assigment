import { useEffect, useRef, useState } from 'react';
import { getSocket } from '../lib/socket';

export const useSearchSocket = () => {
  const socketRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

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

  const search = (query) => {
    const socket = socketRef.current || getSocket();
    setError(null);
    setIsSearching(true);

    socket.emit('search', { query }, (response) => {
      if (response?.message && !response.posts) {
        setError(response.message);
        setResults([]);
      } else {
        setResults(response?.posts || []);
      }

      setIsSearching(false);
    });
  };

  return {
    results,
    search,
    isConnected,
    isSearching,
    error,
  };
};
