# JSONPlaceholder Posts App

A full-stack monorepo that fetches posts from JSONPlaceholder, stores them in MongoDB, serves them through an Express REST API, and provides real-time search over Socket.io.

## Structure

- `frontend` - React + Vite + Tailwind UI
- `backend` - Node.js + Express + Mongoose API
- WebSocket search server - runs from the backend codebase and can be deployed separately when needed

## Features

- Fetches posts from `https://jsonplaceholder.typicode.com/posts`
- Stores posts in MongoDB with duplicate protection
- REST endpoints for all posts, single post, and manual refresh
- Real-time search with Socket.io
- Loading states, skeleton UI, pagination, and empty-state handling

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
SOCKET_CLIENT_URL=http://localhost:5173
JSONPLACEHOLDER_URL=https://jsonplaceholder.typicode.com/posts
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5001
```

### 3. Run locally

```bash
npm run dev
```

This starts:
- Frontend on `http://localhost:5173`
- REST API on `http://localhost:5000`
- Socket.io search server on `http://localhost:5001`

## API Endpoints

- `GET /api/posts` - get all posts
- `GET /api/posts/:id` - get a single post by MongoDB id or external JSONPlaceholder id
- `POST /api/posts/fetch` - fetch and save posts manually
- `GET /api/health` - health check

## WebSocket Events

- Client emits `search` with `{ query }`
- Server responds with `search:results` and matching posts

## Deployment

### Frontend on Vercel

- Set `VITE_API_URL` to the deployed backend REST URL
- Set `VITE_SOCKET_URL` to the deployed Socket.io URL if using a separate websocket host

### Backend REST API on Vercel

- Deploy the `backend` folder as the project root on Vercel
- Set `MONGO_URI`, `CLIENT_URL`, `SOCKET_CLIENT_URL`, and `JSONPLACEHOLDER_URL`
- Vercel handles the REST API via serverless functions

### WebSocket server

- Deploy the Socket.io server separately on Render or Railway if persistent websocket support is required
- Use the same `MONGO_URI` and point frontend `VITE_SOCKET_URL` to that deployment

## Live URLs

- GitHub repo: add your public repository URL here
- Frontend live URL: add your Vercel frontend URL here
- Backend live URL: add your Vercel backend URL here
- Socket server live URL: add your Render or Railway URL here if used

## Notes

- `.env` files and `node_modules` are excluded from version control
- On backend startup, posts are fetched and upserted into MongoDB to avoid duplicates
