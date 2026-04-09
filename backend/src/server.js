import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { ensurePostsSeeded, searchPosts } from './services/post.service.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  const allowedOrigin = process.env.SOCKET_CLIENT_URL || process.env.CLIENT_URL || 'http://localhost:5173';

  const io = new Server(server, {
    cors: {
      origin: allowedOrigin,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('search', async (payload = {}, acknowledge) => {
      try {
        const posts = await searchPosts(payload.query || '');
        const result = {
          query: payload.query || '',
          posts,
        };

        socket.emit('search:results', result);

        if (typeof acknowledge === 'function') {
          acknowledge(result);
        }
      } catch (error) {
        const failure = {
          message: error.message || 'Failed to search posts',
        };

        socket.emit('search:error', failure);

        if (typeof acknowledge === 'function') {
          acknowledge(failure);
        }
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`REST + Socket server listening on port ${PORT}`);
  });

  ensurePostsSeeded()
    .then((result) => {
      if (result.seeded) {
        console.log(`Seeded ${result.count} posts during bootstrap`);
      }
    })
    .catch((error) => {
      console.error('Bootstrap seed failed:', error.message || error);
    });
};

startServer().catch((error) => {
  console.error('Failed to start REST API:', error);
  process.exit(1);
});
