DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `expenses` ALTER COLUMN "description" TO "description" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);