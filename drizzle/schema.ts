import {
    pgTable,
    uuid,
    varchar,
    text,
    integer,
    timestamp,
    pgEnum,
    index,
    uniqueIndex,
  } from "drizzle-orm/pg-core";
  
  /* -----------------------------
     ENUMS
  ----------------------------- */
  
  export const planEnum = pgEnum("plan", [
    "free",
    "starter",
    "pro",
  ]);
  
  export const jobStatusEnum = pgEnum("job_status", [
    "pending",
    "processing",
    "completed",
    "failed",
  ]);
  
  export const platformEnum = pgEnum("platform", [
    "youtube",
    "instagram",
    "reddit",
    "twitter",
    "other",
  ]);
  
  /* -----------------------------
     USERS
  ----------------------------- */
  
  export const users = pgTable(
    "users",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      // Clerk user ID
      clerkUserId: varchar("clerk_user_id", { length: 255 })
        .notNull(),
  
      email: varchar("email", { length: 255 }).notNull(),
  
      name: varchar("name", { length: 255 }),
  
      plan: planEnum("plan").default("free").notNull(),
  
      dailyUsage: integer("daily_usage").default(0).notNull(),
  
      usageResetAt: timestamp("usage_reset_at", {
        withTimezone: true,
      }),
  
      createdAt: timestamp("created_at", {
        withTimezone: true,
      })
        .defaultNow()
        .notNull(),
  
      updatedAt: timestamp("updated_at", {
        withTimezone: true,
      })
        .defaultNow()
        .notNull(),
    },
    (table) => ({
      clerkUserIdIndex: uniqueIndex("users_clerk_user_id_idx").on(
        table.clerkUserId
      ),
  
      emailIndex: uniqueIndex("users_email_idx").on(
        table.email
      ),
    })
  );
  
  /* -----------------------------
     DOWNLOAD / GIF JOBS
  ----------------------------- */
  
  export const jobs = pgTable(
    "jobs",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      userId: uuid("user_id")
        .notNull()
        .references(() => users.id, {
          onDelete: "cascade",
        }),
  
      sourceUrl: text("source_url").notNull(),
  
      platform: platformEnum("platform")
        .default("other")
        .notNull(),
  
      status: jobStatusEnum("status")
        .default("pending")
        .notNull(),
  
      outputUrl: text("output_url"),
  
      errorMessage: text("error_message"),
  
      createdAt: timestamp("created_at", {
        withTimezone: true,
      })
        .defaultNow()
        .notNull(),
  
      completedAt: timestamp("completed_at", {
        withTimezone: true,
      }),
    },
    (table) => ({
      userIdIndex: index("jobs_user_id_idx").on(table.userId),
  
      statusIndex: index("jobs_status_idx").on(table.status),
  
      createdAtIndex: index("jobs_created_at_idx").on(
        table.createdAt
      ),
    })
  );