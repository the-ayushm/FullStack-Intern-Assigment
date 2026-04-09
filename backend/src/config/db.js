import mongoose from 'mongoose';

const globalForMongoose = globalThis;
const cached = globalForMongoose.__mongooseCache || (globalForMongoose.__mongooseCache = {
  connection: null,
  promise: null,
});

export const connectDB = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME || undefined,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 15000,
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
};
