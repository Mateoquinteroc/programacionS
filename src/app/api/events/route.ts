import { getEvents, createEvent, deleteEvent, updateEvent } from "app/db/queries";
import { NextRequest, NextResponse } from "next/server";

// Handler para solicitudes GET (Obtener eventos)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = new Date(searchParams.get("from")!);
    const to = new Date(searchParams.get("to")!);

    // Validar fechas
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json({ error: "Parámetros de fecha inválidos" }, { status: 400 });
    }

    const events = await getEvents(from, to);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { error: "Error interno al obtener eventos" },
      { status: 500 }
    );
  }
}

// Handler para solicitudes POST (Crear nuevo evento)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type, dateFrom, dateTo, title, location, detail, imageUrl, description } = body;

    // Validar campos obligatorios
    if (!type || !dateFrom || !dateTo || !title || !location) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Crear el evento en la base de datos
    const newEvent = await createEvent({
      type,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      title,
      location,
      detail: detail || "abierto",
      imageUrl,
      description,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    return NextResponse.json(
      { error: "Error interno al crear el evento" },
      { status: 500 }
    );
  }
}

// Handler para solicitudes PUT (Actualizar un evento)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Datos recibidos en el servidor para actualizar:", body);

    const { id, type, dateFrom, dateTo, title, location, detail, imageUrl, description } = body;

    // Validar campos obligatorios
    if (!id || !type || !dateFrom || !dateTo || !title || !location) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Validar ID
    if (isNaN(Number(id))) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Actualizar el evento en la base de datos
    const updatedEvent = await updateEvent(Number(id), {
      type,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      title,
      location,
      detail: detail || "abierto",
      imageUrl,
      description,
    });

    console.log("Evento actualizado en la base de datos:", updatedEvent);
    // Validar la respuesta de la actualización
    if (updatedEvent.length > 0) {
      return NextResponse.json(updatedEvent[0], { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error al actualizar el evento" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    return NextResponse.json(
      { error: "Error interno al actualizar el evento" },
      { status: 500 }
    );
  }
}

// Handler para solicitudes DELETE (Eliminar un evento)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validar ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Eliminar el evento
    await deleteEvent(Number(id));

    return NextResponse.json(
      { message: "Evento eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    return NextResponse.json(
      { error: "Error interno al eliminar el evento" },
      { status: 500 }
    );
  }
}
