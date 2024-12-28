ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-27T09:45:50.209Z';--> statement-breakpoint
ALTER TABLE `expenses` ADD `updated_at` text DEFAULT '2024-12-27T09:45:50.209Z' NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `created_at` text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `updated_at` text DEFAULT '2024-12-27T09:45:50.207Z' NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `created_at` text DEFAULT '2024-12-27T09:45:50.209Z' NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `updated_at` text DEFAULT '2024-12-27T09:45:50.209Z' NOT NULL;