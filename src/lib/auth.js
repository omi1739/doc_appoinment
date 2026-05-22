import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('docAppoint');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.BETTER_AUTH_URL, "https://doc-appoinment-coral.vercel.app"],
   emailAndPassword: {    
        enabled: true
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
        }, 
    },

    session:{
        cookieCache: {
            enabled:true,
            strategy: 'jwt',
            maxAge: 5 * 24 * 60 * 60, // 5 days
        }
    },
    
      plugins: [
        jwt(), 
    ]
});