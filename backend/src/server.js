import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import { ensurePostsSeeded } from './services/post.service.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await ensurePostsSeeded();

  app.listen(PORT, () => {
    console.log(`REST API listening on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start REST API:', error);
  process.exit(1);
});
