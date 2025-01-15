// src/db/schema/events.ts
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
    pgTable,
    serial,
    varchar,
    text,
    pgEnum,timestamp
  } from "drizzle-orm/pg-core";

  export const eventTypeEnum = pgEnum('event_type',['exposicion','foro','concierto','taller','congreso','jornadasAcademicas','varios'])
  export const eventLocationEnum = pgEnum('event_location',['sala_principal','sala_alterna','maker','auditorio','oculo','cafe_cultural','sala_capacitaciones','vestibulo_piso1','vestibulo_piso2','vestibulo_piso3','vestibulo_piso4','auditorio_aire'])
  export const eventDetailEnum = pgEnum('event_detail',['abierto','cerrado'])
  
  
  // -----------------------------------------
  // Tabla para los eventos
  // -----------------------------------------
  export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    
    // Campos del evento
    type: eventTypeEnum('type').notNull(),
    dateFrom: timestamp("dateFrom").notNull(),   
    dateTo: timestamp("dateTo").notNull(),     
    title: text("title").notNull(),           
    location: eventLocationEnum("location").notNull(),  
    detail: eventDetailEnum("detail").default('abierto'),  
    imageUrl: text("imageUrl"),                                 
    description: varchar("description",{length:500}),               
  });
  
  export type SelectEvent = InferSelectModel<typeof events>;
  export type InsertEvent = InferInsertModel<typeof events>;