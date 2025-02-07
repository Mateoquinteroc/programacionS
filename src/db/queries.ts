import { asc, eq } from "drizzle-orm";
import { db } from "./index";
import { events, InsertEvent } from "./schema";

// Función para obtener eventos y organizarlos por día
export async function getEvents(from: Date, to: Date) {
  try {
    return await db.query.events.findMany({
      where: (model, { gte, lte, and }) =>
        and(gte(model.dateFrom, from), lte(model.dateTo, to)),
      orderBy: [asc(events.dateFrom)],
    });
  } catch (error) {
    console.error("❌ Error al obtener eventos:", error);
    return [];
  }
}

// Crear evento
export async function createEvent(newEvent: InsertEvent) {
  try {
    return await db.insert(events).values(newEvent).returning();
  } catch (error) {
    console.error("❌ Error al crear el evento:", error);
    return [];
  }
}

// Editar evento
export async function updateEvent(eventId: number, newEvent: InsertEvent) {
  try {
    return await db
      .update(events)
      .set(newEvent)
      .where(eq(events.id, eventId))
      .returning();
  } catch (error) {
    console.error("❌ Error al actualizar el evento:", error);
    return [];
  }
}

// Eliminar evento
export async function deleteEvent(eventId: number) {
  try {
    return await db.delete(events).where(eq(events.id, eventId));
  } catch (error) {
    console.error("❌ Error al eliminar el evento:", error);
    return [];
  }
}
