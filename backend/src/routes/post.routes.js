import { Router } from 'express';
import {
  fetchPosts,
  healthCheck,
  listPosts,
  singlePost,
} from '../controllers/post.controller.js';

const router = Router();

router.get('/health', healthCheck);
router.get('/posts', listPosts);
router.get('/posts/:id', singlePost);
router.post('/posts/fetch', fetchPosts);

export default router;
