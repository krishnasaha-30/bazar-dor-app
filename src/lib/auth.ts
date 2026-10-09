import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI must be set to use authentication.");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};
const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

const database = mongoClient.db(process.env.MONGODB_DATABASE);

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: mongodbAdapter(database, { client: mongoClient }),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
});
