import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Defina MONGODB_URI no arquivo .env.local");
}

// Tipagem global correta para evitar erros TS
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

// Se já existir no global, usa. Senão, cria.
const cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export default async function connectMongo(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "trainer-guide",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
