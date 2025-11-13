import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Defina MONGODB_URI no .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectMongo(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "trainer-guide", // força o uso do DB correto
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;
