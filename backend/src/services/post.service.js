import axios from 'axios';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';

const DEFAULT_SOURCE_URL = 'https://jsonplaceholder.typicode.com/posts';
let bootstrapPromise = null;

const getSourceUrl = () => process.env.JSONPLACEHOLDER_URL || DEFAULT_SOURCE_URL;

const normalizeQuery = (query) => query.trim().replace(/\s+/g, ' ');

export const fetchRemotePosts = async () => {
  const response = await axios.get(getSourceUrl(), {
    timeout: 15000,
  });

  if (!Array.isArray(response.data)) {
    throw new Error('Unexpected JSONPlaceholder response format');
  }

  return response.data;
};

export const upsertPosts = async (posts) => {
  if (!posts.length) {
    return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
  }

  const operations = posts.map((post) => ({
    updateOne: {
      filter: { externalId: post.id },
      update: {
        $set: {
          externalId: post.id,
          userId: post.userId,
          title: post.title,
          body: post.body,
          source: 'jsonplaceholder',
        },
      },
      upsert: true,
    },
  }));

  const result = await Post.bulkWrite(operations, { ordered: false });

  return {
    matchedCount: result.matchedCount || 0,
    modifiedCount: result.modifiedCount || 0,
    upsertedCount: result.upsertedCount || 0,
  };
};

export const syncPostsFromSource = async () => {
  const remotePosts = await fetchRemotePosts();
  const writeResult = await upsertPosts(remotePosts);

  return {
    remoteCount: remotePosts.length,
    ...writeResult,
  };
};

export const ensurePostsSeeded = async () => {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const existingCount = await Post.countDocuments();
      if (existingCount > 0) {
        return { seeded: false, count: existingCount };
      }

      const syncResult = await syncPostsFromSource();
      return { seeded: true, count: syncResult.remoteCount };
    })().catch((error) => {
      bootstrapPromise = null;
      throw error;
    });
  }

  return bootstrapPromise;
};

export const getPosts = async ({ page = 1, limit = 12 } = {}) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 12, 1), 50);
  const skip = (currentPage - 1) * pageSize;

  const [posts, total] = await Promise.all([
    Post.find().sort({ externalId: 1 }).skip(skip).limit(pageSize).lean(),
    Post.countDocuments(),
  ]);

  return {
    posts,
    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages: Math.max(Math.ceil(total / pageSize), 1),
    },
  };
};

export const getPostById = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const post = await Post.findById(id).lean();
    if (post) {
      return post;
    }
  }

  const externalId = Number(id);
  if (Number.isInteger(externalId)) {
    return Post.findOne({ externalId }).lean();
  }

  return null;
};

export const searchPosts = async (query) => {
  const normalizedQuery = normalizeQuery(query || '');

  if (!normalizedQuery) {
    return Post.find().sort({ externalId: 1 }).limit(20).lean();
  }

  const searchRegex = new RegExp(normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

  return Post.find({
    $or: [{ title: searchRegex }, { body: searchRegex }],
  })
    .sort({ externalId: 1 })
    .limit(50)
    .lean();
};
