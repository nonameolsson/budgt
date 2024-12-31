ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T11:23:48.133Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T11:23:48.130Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T11:23:48.131Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "date" TO "date" text NOT NULL DEFAULT '2024-12-31T11:23:48.132Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T11:23:48.132Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T11:23:48.132Z';