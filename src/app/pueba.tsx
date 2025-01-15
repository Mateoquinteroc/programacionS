import { createEvent } from "app/db/queries";

export async function testCreateEvent() {
  try {
    console.log("Conectando a la base de datos...");

    const nuevoEvento = {
      title: "Prueba de Evento TSX",
      dateFrom: new Date("2025-03-10T10:00:00"),
      dateTo: new Date("2025-03-10T12:00:00"),
      type: "foro",
      location: "sala_principal",
      detail: "abierto",
      description: "Este es un evento de prueba usando TSX.",
      imageUrl: "https://example.com/test-event.jpg",
    };

    console.log("Creando el evento en la base de datos...");
    const result = await createEvent(nuevoEvento);

    console.log("Evento creado exitosamente:", result);
  } catch (error) {
    console.error("Error durante la creación del evento:", error);
  }
}
