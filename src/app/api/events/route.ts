// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import { getEventsByDay } from "app/db/queries";

export async function GET() {
  try {
    const data = await getEventsByDay();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 });
  }
}
