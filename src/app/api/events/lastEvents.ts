import { NextApiRequest, NextApiResponse } from "next";
import { db } from "app/db/index"; // Tu configuración de Drizzle
import { events } from "app/db/schema/events";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [lastEvent] = await db
      .select()
      .from(events)
      .orderBy(events.id.desc())
      .limit(1); // Obtiene el último evento por ID

    if (!lastEvent) {
      return res.status(404).json({ error: "No hay eventos disponibles" });
    }

    res.status(200).json(lastEvent);
  } catch (error) {
    console.error("Error al obtener el último evento:", error);
    res.status(500).json({ error: "Error al obtener el último evento" });
  }
}
