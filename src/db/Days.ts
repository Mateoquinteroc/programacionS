import { db } from './index';
import { days, events } from './schema/events';

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

  export async function Days() {
    const day1: Day[] = await db.select().from(days);

    const event1: Event[] = await db.select().from(events);

    const result = day1.reduce((acc, day) => {
        acc[day.name] = event1.filter(event => event.dayId === day.id)
        return acc;
    }, {} as Record<string, Event[]>);
    return result;
    
  }