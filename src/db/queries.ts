import { asc, eq } from "drizzle-orm";
import { db } from "./index";
import { events, InsertEvent } from "./schema";

// Función para obtener eventos y organizarlos por día
export async function getEvents(from: Date, to: Date) {
  if (!db) {
    console.error("❌ ERROR: Base de datos no inicializada");
    return [];
  }

  return db.query.events.findMany({
    where: (model, { gte, lte, and }) =>
      and(gte(model.dateFrom, from), lte(model.dateTo, to)),
    orderBy: [asc(events.dateFrom)],
  });
}

// Crear evento
export async function createEvent(newEvent: InsertEvent) {
  if (!db) {
    throw new Error("Base de datos no inicializada");
  }
  return db.insert(events).values(newEvent).returning();
}

// Editar evento
export async function updateEvent(eventId: number, newEvent: InsertEvent) {
  if (!db) {
    throw new Error("Base de datos no inicializada");
  }
  return db
    .update(events)
    .set(newEvent)
    .where(eq(events.id, eventId))
    .returning();
}

// Eliminar evento
export async function deleteEvent(eventId: number) {
  if (!db) {
    throw new Error("Base de datos no inicializada");
  }
  return db.delete(events).where(eq(events.id, eventId));
}
