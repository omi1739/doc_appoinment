import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide MONGODB_URI in your environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('docAppoint');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "https://doc-appoinment-coral.vercel.app",
  trustedOrigins: [
    "https://doc-appoinment-coral.vercel.app",
    "http://localhost:3000",
    process.env.VERCEL_URL ? \`https://\${process.env.VERCEL_URL}\` : null
  ].filter(Boolean),
   emailAndPassword: {    
        enabled: true
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID || "", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
        }, 
    },
    // Simplified session config for better reliability
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },

      plugins: [
        jwt(), 
    ]
});