"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, count, desc, eq, gte } from "drizzle-orm";

import {
  createShotstackGif,
  stageVideoForShotstack,
} from "@/app/action/shotstack";
import { getYouTubeVideoUrl } from "@/app/action/youtube";
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
    throw new Error(
      "You must be signed in to create a job."
    );
  }

  try {
    const client = await clerkClient();

    const clerkUser =
      await client.users.getUser(userId);

    const email =
      clerkUser.emailAddresses.find(
        (email) =>
          email.id ===
          clerkUser.primaryEmailAddressId
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
        .where(
          eq(users.clerkUserId, userId)
        )
        .limit(1);
    } catch (error) {
      console.error(
        "DATABASE QUERY ERROR:",
        error
      );

      throw error;
    }

    let databaseUser =
      existingUsers[0];

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
      .where(
        eq(users.clerkUserId, userId)
      )
      .limit(1);

    const databaseUser =
      databaseUsers[0];

    if (!databaseUser) {
      return [];
    }

    const userJobs = await db
      .select()
      .from(jobs)
      .where(
        eq(jobs.userId, databaseUser.id)
      )
      .orderBy(
        desc(jobs.createdAt)
      )
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

export async function getDashboardData() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to view your dashboard.");
  }

  const [databaseUser] = await db
    .select({
      id: users.id,
      plan: users.plan,
    })
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1);

  if (!databaseUser) {
    return {
      recentJobs: [],
      todayJobs: 0,
      totalJobs: 0,
      completedJobs: 0,
      plan: "free" as const,
    };
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [recentJobs, todayResult, totalResult, completedResult] =
    await Promise.all([
      db
        .select()
        .from(jobs)
        .where(eq(jobs.userId, databaseUser.id))
        .orderBy(desc(jobs.createdAt))
        .limit(5),
      db
        .select({ value: count() })
        .from(jobs)
        .where(
          and(
            eq(jobs.userId, databaseUser.id),
            gte(jobs.createdAt, startOfToday)
          )
        ),
      db
        .select({ value: count() })
        .from(jobs)
        .where(eq(jobs.userId, databaseUser.id)),
      db
        .select({ value: count() })
        .from(jobs)
        .where(
          and(
            eq(jobs.userId, databaseUser.id),
            eq(jobs.status, "completed")
          )
        ),
    ]);

  return {
    recentJobs,
    todayJobs: todayResult[0]?.value ?? 0,
    totalJobs: totalResult[0]?.value ?? 0,
    completedJobs: completedResult[0]?.value ?? 0,
    plan: databaseUser.plan,
  };
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
    // --------------------------------
    // 1. Find database user
    // --------------------------------

    const databaseUsers = await db
      .select()
      .from(users)
      .where(
        eq(users.clerkUserId, userId)
      )
      .limit(1);

    const databaseUser =
      databaseUsers[0];

    if (!databaseUser) {
      throw new Error(
        "User not found."
      );
    }

    // --------------------------------
    // 2. Find job
    // --------------------------------

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

    // --------------------------------
    // 3. Verify ownership
    // --------------------------------

    if (
      job.userId !== databaseUser.id
    ) {
      throw new Error(
        "You do not have permission to process this job."
      );
    }

    // --------------------------------
    // 4. Mark job as processing
    // --------------------------------

    await db
      .update(jobs)
      .set({
        status: "processing",
        errorMessage: null,
      })
      .where(eq(jobs.id, jobId));

    // --------------------------------
    // 5. Resolve source video
    // --------------------------------

    let videoUrl: string;

    if (job.platform === "youtube") {
      console.log(
        "RESOLVING YOUTUBE VIDEO..."
      );

      videoUrl =
        await getYouTubeVideoUrl(
          job.sourceUrl
        );

      console.log(
        "YOUTUBE VIDEO RESOLVED:",
        videoUrl
      );
    } else {
      throw new Error(
        `Platform "${job.platform}" is not implemented yet.`
      );
    }

    // --------------------------------
    // 6. Stage the video with Shotstack
    // --------------------------------

    console.log(
      "UPLOADING SOURCE VIDEO TO SHOTSTACK..."
    );

    const stagedVideoUrl =
      await stageVideoForShotstack(videoUrl);

    // --------------------------------
    // 7. Render the staged video
    // --------------------------------

    console.log(
      "STARTING SHOTSTACK RENDER..."
    );

    const result =
      await createShotstackGif(
        stagedVideoUrl
      );

    console.log(
      "SHOTSTACK RESULT:",
      result
    );

    // --------------------------------
    // 8. Validate Shotstack result
    // --------------------------------

    if (!result.url) {
      throw new Error(
        "Shotstack completed but did not return a GIF URL."
      );
    }

    // --------------------------------
    // 9. Save completed job
    // --------------------------------

    const completedJobs =
      await db
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

    // --------------------------------
    // 10. Mark job as failed
    // --------------------------------

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
