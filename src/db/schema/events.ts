// src/db/schema/events.ts
import {
    pgTable,
    serial,
    varchar,
    text,
    integer,
  } from "drizzle-orm/pg-core";
  
  // -----------------------------------------
  // Tabla para los días de la semana
  // -----------------------------------------
  export const days = pgTable("days", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 20 }).notNull(),
  });
  
  // -----------------------------------------
  // Tabla para los eventos
  // -----------------------------------------
  export const events = pgTable("events", {
    id: serial("id").primaryKey(),
  
    // Relación con days.id
    dayId: integer("day_id").notNull(),
  
    // Campos del evento
    type: varchar("type", { length: 50 }).notNull(),
    date: varchar("date", { length: 50 }).notNull(),       // "Martes 10", "Miércoles 11", etc.
    month: varchar("month", { length: 50 }).notNull(),     // "diciembre"
    hour: varchar("hour", { length: 50 }).notNull(),       // "8:00 a.m. a 8:00 p.m."
    title: text("title").notNull(),                        // "Exposición Bestiario Mutantes"
    place: text("place").notNull(),                        // "Sala de exposiciones alterna"
    detail: text("detail"),                                // "Abierto al público"
    color: varchar("color", { length: 50 }),               // "bg-naranja"
    image: text("image"),                                  // URL o vacío
    description: text("description"),                      // Texto descriptivo
  });
  