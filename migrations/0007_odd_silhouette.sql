CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`currency` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:19:45.865Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T15:19:45.863Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:19:45.864Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "date" TO "date" text NOT NULL DEFAULT '2024-12-31T15:19:45.864Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-31T15:19:45.864Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-31T15:19:45.864Z';