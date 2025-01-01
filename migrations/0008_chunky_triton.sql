ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:23:50.530Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T15:23:50.527Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:23:50.528Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "date" TO "date" text NOT NULL DEFAULT '2024-12-31T15:23:50.529Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T15:23:50.529Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:23:50.529Z';