CREATE TABLE "days" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"day_id" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"date" varchar(50) NOT NULL,
	"month" varchar(50) NOT NULL,
	"hour" varchar(50) NOT NULL,
	"title" text NOT NULL,
	"place" text NOT NULL,
	"detail" text,
	"color" varchar(50),
	"image" text,
	"description" text
);
