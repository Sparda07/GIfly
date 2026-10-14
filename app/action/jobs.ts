"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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

export async function createJob(
  sourceUrl: string,
  platform: SupportedPlatform
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a job.");
  }

  try {
    // Get current Clerk user
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      throw new Error("No email address found for this account.");
    }

    // Find user in database
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

    // Create database user if they don't exist
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

    // Convert frontend platform to database platform
    const databasePlatform = platformMap[platform];

    // Create job
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