const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const parseResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const fetchPosts = async ({ page = 1, limit = 12 } = {}) => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_BASE_URL}/api/posts?${searchParams.toString()}`);
  return parseResponse(response);
};

export const fetchPost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`);
  return parseResponse(response);
};

export const fetchAndStorePosts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/posts/fetch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseResponse(response);
};

export const searchPosts = async (query) => {
  const searchParams = new URLSearchParams({
    query: String(query || ''),
  });

  const response = await fetch(`${API_BASE_URL}/api/posts/search?${searchParams.toString()}`);
  return parseResponse(response);
};

export { API_BASE_URL };
