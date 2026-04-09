# Signal Posts - Full Stack Assignment

This project is a simple production-style full stack app.
It fetches posts from JSONPlaceholder, stores them in MongoDB, and shows them in a clean UI with search and pagination.

## Live Demo

- Frontend: https://full-stack-intern-assigment-fronten.vercel.app/
- Backend API: https://fullstack-intern-assignment.onrender.com

## What This App Does

- Fetches 100 posts from JSONPlaceholder
- Stores posts in MongoDB (no duplicate inserts)
- Shows paginated posts in React UI
- Supports live search (Socket first, API fallback)
- Shows loading skeletons and user-friendly error states

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Socket.io
- Database: MongoDB Atlas + Mongoose
- Deployment: Vercel (frontend), Render (backend)

## Project Structure

- frontend: React application
- backend: Express API + Socket server in single process

## API Endpoints

- GET /api/health
- GET /api/posts?page=1&limit=12
- GET /api/posts/:id
- GET /api/posts/search?query=your_text
- POST /api/posts/fetch

## Socket Event

- Client emits: search with { query }
- Server returns: search:results

## Local Setup (3 Steps)

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment files

Create backend/.env

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
SOCKET_CLIENT_URL=http://localhost:5173
JSONPLACEHOLDER_URL=https://jsonplaceholder.typicode.com/posts
```

Create frontend/.env

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Run app

```bash
npm run dev
```

App URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Reviewer Quick Test

1. Open frontend URL.
2. Verify posts are visible with pagination.
3. Type in search box and check results update.
4. Click Sync posts and confirm success behavior.
5. Open GET /api/health and confirm API is running.

## Important Notes

- Search is resilient: if websocket is slow/down, app automatically falls back to HTTP search.
- Backend uses MongoDB connection caching and request-safe timeouts.
- Env files and node_modules are excluded from git.
