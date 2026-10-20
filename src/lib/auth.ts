import { betterAuth } from "better-auth";
import { MongoClient, type Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const DB_NAME = "bazar-dor-project";

let client: MongoClient | undefined;

/**
 * The MongoClient is created on first use instead of at module scope.
 *
 * `new MongoClient(uri)` throws when the URI is missing or malformed, and this
 * module is imported while `next build` collects route configuration. Building
 * the app must not require database credentials — only serving requests does.
 */
function getClient(): MongoClient {
  if (!client) {
    const uri = process.env.MONGODB_CLIENT_URL;
    if (!uri) {
      throw new Error(
        "MONGODB_CLIENT_URL is not set. Copy .env.example to .env and fill in your MongoDB connection string.",
      );
    }
    client = new MongoClient(uri);
  }
  return client;
}

/**
 * Forwards every property access to a lazily created instance, so the real
 * MongoClient/Db is only constructed when a query actually runs.
 */
function lazy<T extends object>(resolve: () => T): T {
  return new Proxy({} as T, {
    get(_target, prop) {
      const instance = resolve();
      const value = Reflect.get(instance, prop, instance);
      return typeof value === "function" ? value.bind(instance) : value;
    },
  });
}

const db = lazy<Db>(() => getClient().db(DB_NAME));
const mongoClient = lazy<MongoClient>(() => getClient());

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_SIGNIN_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SIGNIN_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
});
