import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

let db = null;

if (process.env.MONGODB_URI) {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }
  db = global._mongoClient.db('docAppoint');
}

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  return "https://doc-appoinment-coral.vercel.app";
};

export const auth = betterAuth({
  database: db ? mongodbAdapter(db) : undefined,
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-key-123456",
  baseURL: getBaseURL(),
  trustedOrigins: [
    "https://doc-appoinment-coral.vercel.app",
    "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
  ].filter(Boolean),
  emailAndPassword: {    
    enabled: true
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: { 
        clientId: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      }
    } : {}),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    jwt(),
    nextCookies(),
  ]
});