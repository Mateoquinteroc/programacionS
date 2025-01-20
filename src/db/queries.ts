// src/db/queries.ts

import { asc, eq } from "drizzle-orm";
import { db } from "./index";
import { events, InsertEvent } from "./schema";

// Función para obtener eventos y organizarlos por día
export async function getEvents(from: Date, to: Date) {
  // Seleccionar datos de la tabla "events"
  return db.query.events.findMany({
    where: (model, { gte, lte, and }) =>
      and(gte(model.dateFrom, from), lte(model.dateTo, to)),
    orderBy: [asc(events.dateFrom)],
  });
}

// Crear evento
export async function createEvent(newEvent: InsertEvent) {
  return db.insert(events).values(newEvent).returning(); // Asegúrate de usar `.returning()`
}

// Editar evento
export async function updateEvent(eventId: number, newEvent: InsertEvent) {
  return db
    .update(events)
    .set(newEvent)
    .where(eq(events.id, eventId))
    .returning(); // Esto devuelve el evento actualizado como un array
}

// Eliminar evento
export async function deleteEvent(eventId: number) {
  return db
    .delete(events)
    .where(eq(events.id, eventId)); // Filtrar por ID del evento
}
