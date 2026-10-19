import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { jobs, users } from "@/drizzle/schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { jobId } = await params;
  const [job] = await db
    .select({
      id: jobs.id,
      outputUrl: jobs.outputUrl,
    })
    .from(jobs)
    .innerJoin(users, eq(jobs.userId, users.id))
    .where(
      and(
        eq(jobs.id, jobId),
        eq(users.clerkUserId, userId),
        eq(jobs.status, "completed")
      )
    )
    .limit(1);

  if (!job?.outputUrl) {
    return new Response("GIF not found", { status: 404 });
  }

  const gifResponse = await fetch(job.outputUrl);

  if (!gifResponse.ok || !gifResponse.body) {
    return new Response("GIF is temporarily unavailable", {
      status: 502,
    });
  }

  const contentType =
    gifResponse.headers.get("content-type") || "image/gif";
  const contentLength = gifResponse.headers.get("content-length");

  return new Response(gifResponse.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="gifly-${job.id}.gif"`,
      "Cache-Control": "private, no-store",
      ...(contentLength ? { "Content-Length": contentLength } : {}),
    },
  });
}
