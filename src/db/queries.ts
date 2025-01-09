// src/db/queries.ts
import { db } from './index';
import { days, events } from './schema/events';

// Define manualmente los tipos para las tablas
type Day = {
  id: number;        // ID único del día
  name: string;      // Nombre del día ("Lunes", "Martes", etc.)
};

type Event = {
  id: number;             // ID único del evento
  type: string;           // Tipo de evento ("Exposición", "Concierto", etc.)
  date: string;           // Fecha del evento ("Lunes 9", "Martes 10", etc.)
  month: string;          // Mes del evento ("diciembre")
  hour: string;           // Hora del evento ("8:00 a.m. a 8:00 p.m.")
  title: string;          // Título del evento
  place: string;          // Lugar del evento
  detail: string | null;  // Detalles del evento (puede ser nulo)
  color: string | null;   // Color del evento (puede ser nulo)
  image: string | null;   // Imagen del evento (puede ser nulo)
  description: string | null; // Descripción del evento (puede ser nulo)
  dayId: number;          // ID del día relacionado
};

// Función para obtener eventos y organizarlos por día
export async function getEventsByDay() {
  // Seleccionar datos de la tabla "days"
  const daysData: Day[] = await db.select().from(days);

  // Seleccionar datos de la tabla "events"
  const eventsData: Event[] = await db.select().from(events);

  // Transformar los datos en un formato similar al JSON original
  const result = daysData.reduce((acc, day) => {
    acc[day.name] = eventsData.filter(event => event.dayId === day.id);
    return acc;
  }, {} as Record<string, Event[]>);

  return result;
}
