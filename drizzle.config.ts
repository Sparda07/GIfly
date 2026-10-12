import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}); 