// src/db/queries.ts

import { asc } from "drizzle-orm";
import { db } from "./index";
import { events, InsertEvent } from "./schema";

// Función para obtener eventos y organizarlos por día
export async function getEvents(from: Date, to: Date) {
  // Seleccionar datos de la tabla "events"
  return db.query.events.findMany({
    where: (model, { gte, lte, and }) =>
      and(gte(model.dateFrom, from), lte(model.dateTo, to)),
    orderBy:[asc(events.dateFrom)]
  });
}


// Crear evento
export async function createEvent(newEvent: InsertEvent) {
  return db.insert(events).values(newEvent).returning();
}

// Editar evento


// Eliminar evento