import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const mongoUri: string = MONGODB_URI;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Keep one cache across Next.js hot-reload cycles in development.
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cached;

/** Connect to MongoDB once and reuse the connection for later requests. */
export default async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse an in-flight connection attempt when multiple requests arrive together.
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Allow a later request to retry if the initial connection fails.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
