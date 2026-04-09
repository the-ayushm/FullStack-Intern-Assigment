import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getPostById,
  getPosts,
  syncPostsFromSource,
} from '../services/post.service.js';

export const fetchPosts = asyncHandler(async (request, response) => {
  const result = await syncPostsFromSource();

  response.status(200).json({
    success: true,
    message: 'Posts fetched and stored successfully',
    data: result,
  });
});

export const listPosts = asyncHandler(async (request, response) => {
  const { page, limit } = request.query;
  const result = await getPosts({ page, limit });

  response.status(200).json({
    success: true,
    ...result,
  });
});

export const singlePost = asyncHandler(async (request, response) => {
  const post = await getPostById(request.params.id);

  if (!post) {
    response.status(404).json({
      success: false,
      message: 'Post not found',
    });
    return;
  }

  response.status(200).json({
    success: true,
    post,
  });
});

export const healthCheck = asyncHandler(async (request, response) => {
  response.status(200).json({
    success: true,
    message: 'API is healthy',
  });
});
