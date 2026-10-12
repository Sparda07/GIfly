CREATE TYPE "public"."job_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('free', 'starter', 'pro');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('youtube', 'instagram', 'reddit', 'twitter', 'other');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"source_url" text NOT NULL,
	"platform" "platform" DEFAULT 'other' NOT NULL,
	"status" "job_status" DEFAULT 'pending' NOT NULL,
	"output_url" text,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"plan" "plan" DEFAULT 'free' NOT NULL,
	"daily_usage" integer DEFAULT 0 NOT NULL,
	"usage_reset_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "jobs_user_id_idx" ON "jobs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "jobs_status_idx" ON "jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_clerk_user_id_idx" ON "users" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");