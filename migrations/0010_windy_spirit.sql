ALTER TABLE `users` RENAME COLUMN "currency" TO "currency_code";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.509Z';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.509Z';--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.503Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.500Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.501Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "date" TO "date" text NOT NULL DEFAULT '2025-01-03T16:50:59.502Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.502Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-03T16:50:59.502Z';