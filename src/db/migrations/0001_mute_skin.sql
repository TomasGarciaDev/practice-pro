ALTER TABLE "users" ADD COLUMN "kinde_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id");