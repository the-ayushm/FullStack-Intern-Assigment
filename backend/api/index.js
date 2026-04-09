import 'dotenv/config';
import serverless from 'serverless-http';
import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

const handler = serverless(app);

export default async function vercelHandler(request, response) {
  await connectDB();

  return handler(request, response);
}
