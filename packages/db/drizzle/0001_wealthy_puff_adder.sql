CREATE TABLE IF NOT EXISTS "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text,
	"id_user" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offers_sub" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offerId" uuid NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text,
	"id_user" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"descr" text,
	"img" varchar(256),
	"vote" smallint,
	"public" boolean DEFAULT true,
	"like" smallint,
	"id_user" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DROP TABLE "account";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "profiles";--> statement-breakpoint
ALTER TABLE "post" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "profiles" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "full_name" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "avatar_url" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "website" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "born" varchar(12);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "nation" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "city" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "position" varchar(255);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "vote" smallint;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "aboutme" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "updated_at" timestamp with time zone;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers" ADD CONSTRAINT "offers_id_user_profiles_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers_sub" ADD CONSTRAINT "offers_sub_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers_sub" ADD CONSTRAINT "offers_sub_id_user_profiles_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_images" ADD CONSTRAINT "users_images_id_user_profiles_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "date";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "role";