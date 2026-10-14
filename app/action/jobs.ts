"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { users, jobs } from "@/drizzle/schema";

type SupportedPlatform =
  | "youtube"
  | "instagram"
  | "reddit"
  | "x";

const platformMap = {
  youtube: "youtube",
  instagram: "instagram",
  reddit: "reddit",
  x: "twitter",
} as const;

/**
 * Create a new processing job.
 */
export async function createJob(
  sourceUrl: string,
  platform: SupportedPlatform
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a job.");
  }

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      throw new Error("No email address found for this account.");
    }

    let existingUsers;

    try {
      existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, userId))
        .limit(1);
    } catch (error) {
      console.error("DATABASE QUERY ERROR:", error);
      throw error;
    }

    let databaseUser = existingUsers[0];

    // Create user in our database if they don't exist yet.
    if (!databaseUser) {
      const newUsers = await db
        .insert(users)
        .values({
          clerkUserId: userId,
          email,
          name:
            clerkUser.firstName || clerkUser.lastName
              ? `${clerkUser.firstName ?? ""} ${
                  clerkUser.lastName ?? ""
                }`.trim()
              : null,
        })
        .returning();

      databaseUser = newUsers[0];
    }

    const databasePlatform = platformMap[platform];

    const newJobs = await db
      .insert(jobs)
      .values({
        userId: databaseUser.id,
        sourceUrl,
        platform: databasePlatform,
        status: "pending",
      })
      .returning();

    return {
      success: true,
      job: newJobs[0],
    };
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to create job."
    );
  }
}

/**
 * Get the latest jobs belonging to the currently signed-in user.
 */
export async function getUserJobs() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to view your jobs.");
  }

  try {
    const databaseUsers = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    const databaseUser = databaseUsers[0];

    if (!databaseUser) {
      return [];
    }

    const userJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.userId, databaseUser.id))
      .orderBy(desc(jobs.createdAt))
      .limit(5);

    return userJobs;
  } catch (error) {
    console.error("GET USER JOBS ERROR:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to load jobs."
    );
  }
}

/**
 * Process a job.
 *
 * TEMPORARY:
 * This does not download or convert anything yet.
 * It only simulates the processing lifecycle:
 *
 * pending → processing → completed
 */
export async function processJob(jobId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  try {
    // Find the current user's database record.
    const databaseUsers = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    const databaseUser = databaseUsers[0];

    if (!databaseUser) {
      throw new Error("User not found.");
    }

    // Find the requested job.
    const existingJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    const job = existingJobs[0];

    if (!job) {
      throw new Error("Job not found.");
    }

    // Security check:
    // A user can only process their own jobs.
    if (job.userId !== databaseUser.id) {
      throw new Error(
        "You do not have permission to process this job."
      );
    }

    // Move job to processing.
    await db
      .update(jobs)
      .set({
        status: "processing",
      })
      .where(eq(jobs.id, jobId));

    // TEMPORARY PROCESSING SIMULATION
    // Later this will be replaced with the actual
    // video downloading / GIF conversion process.
    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    // Mark job as completed.
    const completedJobs = await db
      .update(jobs)
      .set({
        status: "completed",
        completedAt: new Date(),
      })
      .where(eq(jobs.id, jobId))
      .returning();

    return {
      success: true,
      job: completedJobs[0],
    };
  } catch (error) {
    console.error("PROCESS JOB ERROR:", error);

    // Try to mark the job as failed.
    try {
      await db
        .update(jobs)
        .set({
          status: "failed",
          errorMessage:
            error instanceof Error
              ? error.message
              : "Unknown processing error.",
        })
        .where(eq(jobs.id, jobId));
    } catch (updateError) {
      console.error(
        "FAILED TO UPDATE JOB STATUS:",
        updateError
      );
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to process job."
    );
  }
}