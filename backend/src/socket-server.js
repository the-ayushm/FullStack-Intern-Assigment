import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import { ensurePostsSeeded, searchPosts } from './services/post.service.js';

const app = express();
const PORT = process.env.SOCKET_PORT || process.env.PORT || 5001;

app.use(
  cors({
    origin: true,
    credentials: false,
  })
);

app.get('/health', (request, response) => {
  response.json({
    success: true,
    message: 'Socket server is healthy',
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('search', async (payload = {}, acknowledge) => {
    try {
      const posts = await searchPosts(payload.query || '');
      const response = {
        query: payload.query || '',
        posts,
      };

      socket.emit('search:results', response);

      if (typeof acknowledge === 'function') {
        acknowledge(response);
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

const startSocketServer = async () => {
  await connectDB();
  await ensurePostsSeeded();

  server.listen(PORT, () => {
    console.log(`Socket server listening on port ${PORT}`);
  });
};

startSocketServer().catch((error) => {
  console.error('Failed to start socket server:', error);
  process.exit(1);
});
