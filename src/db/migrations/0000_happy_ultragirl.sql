CREATE TABLE "practice_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"practice_routine_id" integer NOT NULL,
	"excercise" varchar(200) NOT NULL,
	"application" text,
	"goal" varchar(150) NOT NULL,
	"metronome_range" varchar(100),
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"practice_item_id" integer NOT NULL,
	"excercise" varchar(100) NOT NULL,
	"metronome" varchar(30) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_routines" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"instrument" varchar(50),
	"achieved_goals" integer,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "practice_items" ADD CONSTRAINT "practice_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_items" ADD CONSTRAINT "practice_items_practice_routine_id_practice_routines_id_fk" FOREIGN KEY ("practice_routine_id") REFERENCES "public"."practice_routines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_logs" ADD CONSTRAINT "practice_logs_practice_item_id_practice_items_id_fk" FOREIGN KEY ("practice_item_id") REFERENCES "public"."practice_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_routines" ADD CONSTRAINT "practice_routines_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;