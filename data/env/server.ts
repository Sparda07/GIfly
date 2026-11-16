import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,

  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string(),
    SHOTSTACK_API_KEY: z.string(),
    YOUTUBE_PO_TOKEN: z.string().optional(),
    YOUTUBE_VISITOR_DATA: z.string().optional(),
    YOUTUBE_RESOLVER_URL: z.string().url().optional(),
    YOUTUBE_RESOLVER_SECRET: z.string().optional(),
  },

  experimental__runtimeEnv: process.env,
});