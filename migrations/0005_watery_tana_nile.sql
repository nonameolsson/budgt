ALTER TABLE `expenses` RENAME COLUMN "accountId" TO "account_id";--> statement-breakpoint
ALTER TABLE `expenses` RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-30T17:40:09.968Z';--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-30T17:40:09.968Z';--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-30T17:40:09.969Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2024-12-30T17:40:09.966Z';--> statement-breakpoint
ALTER TABLE `categories` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2024-12-30T17:40:09.967Z';