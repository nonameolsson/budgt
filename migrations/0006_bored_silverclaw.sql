ALTER TABLE `expenses` RENAME COLUMN "accountId" TO "created_at";--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL;