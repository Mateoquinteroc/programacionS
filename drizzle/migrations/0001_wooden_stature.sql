CREATE TYPE "public"."event_detail" AS ENUM('abierto', 'cerrado');--> statement-breakpoint
CREATE TYPE "public"."event_location" AS ENUM('sala_principal', 'sala_alterna', 'maker', 'auditorio', 'oculo', 'cafe_cultural', 'sala_capacitaciones', 'vestibulo_piso1', 'vestibulo_piso2', 'vestibulo_piso3', 'vestibulo_piso4', 'auditorio_aire');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('exposicion', 'foro', 'concierto', 'taller', 'congreso', 'jornadasAcademicas', 'varios');--> statement-breakpoint
ALTER TABLE "days" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "days" CASCADE;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE event_type;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "detail" SET DATA TYPE event_detail;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "detail" SET DEFAULT 'abierto';--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "description" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "dateFrom" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "dateTo" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" "event_location" NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "imageUrl" text;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "day_id";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "date";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "month";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "hour";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "place";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "color";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "image";