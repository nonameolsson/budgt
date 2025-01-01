ALTER TABLE `users` RENAME COLUMN "name" TO "username";--> statement-breakpoint
CREATE TABLE `currencies` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` text DEFAULT '2025-01-01T11:19:47.294Z' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` text DEFAULT '2025-01-01T11:19:47.294Z' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-01T11:19:47.287Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-01T11:19:47.284Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-01T11:19:47.286Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "date" TO "date" text NOT NULL DEFAULT '2025-01-01T11:19:47.286Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-01T11:19:47.287Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-01T11:19:47.287Z';