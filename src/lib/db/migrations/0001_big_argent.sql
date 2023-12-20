DO $$ BEGIN
 CREATE TYPE "tuner" AS ENUM('idea', 'tone', 'summary', 'concept', 'language', 'brainstorm', 'reference', 'mindmap', 'citation', 'connection', 'mood', 'voice', 'culture', 'data', 'creativewriting');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tuner" (
	"id" text PRIMARY KEY NOT NULL,
	"tuner" "tuner" NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tuner_attribute" (
	"id" text PRIMARY KEY NOT NULL,
	"tuner_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tuner_attribute" ADD CONSTRAINT "tuner_attribute_tuner_id_tuner_id_fk" FOREIGN KEY ("tuner_id") REFERENCES "tuner"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
