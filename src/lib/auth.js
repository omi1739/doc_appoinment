import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const getDb = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }
  try {
    const client = new MongoClient(uri);
    return client.db('docAppoint');
  } catch (e) {
    console.error("Failed to initialize MongoDB client:", e);
    return null;
  }
};

const db = getDb();

export const auth = betterAuth({
  database: db ? mongodbAdapter(db) : undefined,
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-key-123456",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "https://doc-appoinment-coral.vercel.app",
    "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
  ].filter(Boolean),
  emailAndPassword: {    
    enabled: true
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID || "missing", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing", 
    }, 
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    jwt(), 
  ]
});