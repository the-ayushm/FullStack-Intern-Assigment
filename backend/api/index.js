import 'dotenv/config';
import serverless from 'serverless-http';
import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';
import { ensurePostsSeeded } from '../src/services/post.service.js';

const handler = serverless(app);

export default async function vercelHandler(request, response) {
  await connectDB();
  await ensurePostsSeeded();

  return handler(request, response);
}
