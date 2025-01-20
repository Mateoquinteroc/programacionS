"use client";

import { useState } from "react";
import { SelectEvent } from "app/db/schema";
import { CardCompose } from "../CardCompose/CardCompose";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDia/CardDia.module.sass";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MenuOptions } from "./MenuOptions";
import { deleteEventById } from "./eventUtilis";

export const EventsContainer = ({
  eventos,
  onSelect,
  isAdminMode,
  day,
  onEventUpdated, // Nueva prop para manejar actualizaciones de eventos
}: {
  eventos: SelectEvent[];
  onSelect: (event: SelectEvent | null) => void;
  isAdminMode: boolean;
  day: Date;
  onEventUpdated: (updatedEvent: SelectEvent | null) => void; // Prop para manejar eventos actualizados
}) => {
  const [isCardComposeOpen, setIsCardComposeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<SelectEvent | null>(null); // Nuevo estado para el evento a editar

  // Abrir CardCompose para creación
  const openCardCompose = () => {
    setEventToEdit(null); // Limpiar el evento a editar
    setSelectedDate(day);
    setIsCardComposeOpen(true);
  };

  // Abrir CardCompose para edición
  const handleEdit = (event: SelectEvent) => {
    setEventToEdit(event); // Establecer el evento a editar
    setSelectedDate(new Date(event.dateFrom)); // Usar la fecha del evento
    setIsCardComposeOpen(true);
  };

  // Manejar la eliminación de un evento
  const handleDelete = async (id: number) => {
    const isDeleted = await deleteEventById(id);

    if (isDeleted) {
      const deletedEvent = eventos.find((event) => event.id === id);
      if (deletedEvent) {
        window.location.reload(); // Actualizar la página
      }
    }
  };

  return (
    <div className={styles.eventsContainer}>
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className={styles.eventCard}
          style={{
            backgroundColor: colorByType[evento.type],
          }}
          onClick={() => {
            if (!isAdminMode) {
              onSelect(evento);
            } else {
              onSelect(null);
            }
          }}
        >
          {isAdminMode && (
            <MenuOptions
              onEdit={() => handleEdit(evento)} // Llamar a la función de edición
              onDelete={() => handleDelete(evento.id)}
              onCopy={() => console.log("Copiar evento")}
            />
          )}
          <p className={styles.eventTitle}>{evento.title}</p>
          <p className={styles.eventHour}>
            {format(evento.dateFrom, "hh:mm a", { locale: es })}
          </p>
          <p className={styles.eventPlace}>
            {locationTranslations[evento.location]}
          </p>
        </div>
      ))}

      {isAdminMode && (
        <button className={styles.addButton} onClick={openCardCompose}>
          +
        </button>
      )}

      {isCardComposeOpen && (
        <CardCompose
          date={selectedDate || day}
          onClose={() => setIsCardComposeOpen(false)}
          onEventCreated={(newEvent) => {
            if (eventToEdit) {
              onEventUpdated(newEvent); // Notificar actualización
            } else {
              
              console.log("Nuevo evento creado:", newEvent);
            }
            setIsCardComposeOpen(false);
          }}
          eventToEdit={eventToEdit || null} // Pasar el evento a editar, si existe
        />
      )}
    </div>
  );
};
