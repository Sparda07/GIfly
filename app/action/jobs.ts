"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import { createShotstackGif } from "@/app/action/shotstack";
import { db } from "@/drizzle/db";
import { jobs, users } from "@/drizzle/schema";

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
      (email) =>
        email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      throw new Error(
        "No email address found for this account."
      );
    }

    let existingUsers;

    try {
      existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, userId))
        .limit(1);
    } catch (error) {
      console.error(
        "DATABASE QUERY ERROR:",
        error
      );

      throw error;
    }

    let databaseUser = existingUsers[0];

    if (!databaseUser) {
      const newUsers = await db
        .insert(users)
        .values({
          clerkUserId: userId,
          email,
          name:
            clerkUser.firstName ||
            clerkUser.lastName
              ? `${clerkUser.firstName ?? ""} ${
                  clerkUser.lastName ?? ""
                }`.trim()
              : null,
        })
        .returning();

      databaseUser = newUsers[0];
    }

    const databasePlatform =
      platformMap[platform];

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
    console.error(
      "CREATE JOB ERROR:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to create job."
    );
  }
}

export async function getUserJobs() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error(
      "You must be signed in to view your jobs."
    );
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
    console.error(
      "GET USER JOBS ERROR:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to load jobs."
    );
  }
}

export async function processJob(
  jobId: string
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error(
      "You must be signed in."
    );
  }

  try {
    const databaseUsers = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    const databaseUser = databaseUsers[0];

    if (!databaseUser) {
      throw new Error(
        "User not found."
      );
    }

    const existingJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    const job = existingJobs[0];

    if (!job) {
      throw new Error(
        "Job not found."
      );
    }

    if (job.userId !== databaseUser.id) {
      throw new Error(
        "You do not have permission to process this job."
      );
    }

    // Mark job as processing
    await db
      .update(jobs)
      .set({
        status: "processing",
        errorMessage: null,
      })
      .where(eq(jobs.id, jobId));

    // TEMPORARY TEST SOURCE
    //
    // We are intentionally NOT using job.sourceUrl yet.
    // Shotstack needs a direct public video URL.
    const testVideoUrl =
      "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/footage/earth.mp4";

    // Send video to Shotstack and wait
    // until the GIF rendering is completed.
    const result =
      await createShotstackGif(
        testVideoUrl
      );

    if (!result.url) {
      throw new Error(
        "Shotstack completed but did not return a GIF URL."
      );
    }

    // Save the generated GIF URL
    // and mark the job as completed.
    const completedJobs = await db
      .update(jobs)
      .set({
        status: "completed",
        outputUrl: result.url,
        completedAt: new Date(),
        errorMessage: null,
      })
      .where(eq(jobs.id, jobId))
      .returning();

    return {
      success: true,
      job: completedJobs[0],
    };
  } catch (error) {
    console.error(
      "PROCESS JOB ERROR:",
      error
    );

    // If anything fails, mark the job as failed.
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