// Función para guardar un evento (crear o editar)
export async function saveEvent(
  eventData: Record<string, any>,
  isEdit: boolean = false
): Promise<any> {
  const url = isEdit && eventData.id ? `/api/events?id=${eventData.id}` : "/api/events";
  const method = isEdit ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `Evento ${isEdit ? "editado" : "creado"} correctamente:`,
        result
      );
      return result;
    } else {
      const errorText = await response.text();
      console.error(
        `Error al ${isEdit ? "editar" : "crear"} el evento:`,
        errorText
      );
      throw new Error(errorText);
    }
  } catch (error) {
    console.error(
      `Error en la solicitud ${isEdit ? "PUT" : "POST"}:`,
      error
    );
    throw error;
  }
}

// Función para eliminar un evento por ID
export async function deleteEventById(id: number): Promise<boolean> {
  const confirmDelete = window.confirm(
    "¿Estás seguro de que deseas eliminar este evento?"
  );

  if (!confirmDelete) return false;

  try {
    const response = await fetch(`/api/events?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Evento con ID ${id} eliminado correctamente`);
      return true;
    } else {
      const errorText = await response.text();
      console.error(`Error al eliminar el evento con ID ${id}:`, errorText);
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    throw error;
  }
}
