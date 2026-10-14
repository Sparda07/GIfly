import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Next.js gives .env.local precedence during local development. Load it first
// so migrations target the same database the application uses.
dotenv.config({ path: ".env.local", override: true });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
