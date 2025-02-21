CREATE TYPE "public"."event_detail" AS ENUM('abierto', 'cerrado');--> statement-breakpoint
CREATE TYPE "public"."event_location" AS ENUM('sala_principal', 'sala_alterna', 'maker', 'auditorio', 'oculo', 'cafe_cultural', 'sala_capacitaciones', 'vestibulo_piso1', 'vestibulo_piso2', 'vestibulo_piso3', 'vestibulo_piso4', 'auditorio_aire');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('exposicion', 'foro', 'concierto', 'taller', 'congreso', 'jornadasAcademicas', 'varios');--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "event_type" NOT NULL,
	"dateFrom" timestamp NOT NULL,
	"dateTo" timestamp NOT NULL,
	"title" text NOT NULL,
	"location" "event_location" NOT NULL,
	"detail" "event_detail" DEFAULT 'abierto',
	"imageUrl" text,
	"description" varchar(500)
);
