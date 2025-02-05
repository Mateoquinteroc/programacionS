"use client";

import { useState } from "react";
import { SelectEvent } from "app/db/schema";
import { CardCompose } from "../CardCompose/CardCompose";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDia/CardDia.module.sass";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { MenuOptions } from "./MenuOptions";
import { deleteEventById } from "./eventUtilis";

export const EventsContainer = ({
  eventos,
  onSelect,
  isAdminMode,
  day,
  onEventUpdated,
}: {
  eventos: SelectEvent[];
  onSelect: (event: SelectEvent | null) => void;
  isAdminMode: boolean;
  day: Date;
  onEventUpdated: (updatedEvent: SelectEvent | null) => void;
}) => {
  const [isCardComposeOpen, setIsCardComposeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<SelectEvent | null>(null);

  // Abrir CardCompose para creación
  const openCardCompose = () => {
    setEventToEdit(null);
    setSelectedDate(day);
    setIsCardComposeOpen(true);
  };

  // Abrir CardCompose para edición
  const handleEdit = (event: SelectEvent) => {
    setEventToEdit(event);
    setSelectedDate(new Date(event.dateFrom));
    setIsCardComposeOpen(true);
  };

  // Manejar la eliminación de un evento
  const handleDelete = async (id: number) => {
    const isDeleted = await deleteEventById(id);

    if (isDeleted) {
      const deletedEvent = eventos.find((event) => event.id === id);
      if (deletedEvent) {
        window.location.reload();
      }
    }
  };

  // Copiar evento al día siguiente
  const copyEventToNextDay = (eventToEdit: SelectEvent) => {
    if (!eventToEdit) return;

    // Incrementamos la fecha en 1 día
    const newDateFrom = addDays(new Date(eventToEdit.dateFrom), 1);
    const newDateTo = addDays(new Date(eventToEdit.dateTo), 1);

    // Creamos un nuevo evento con la misma info, pero con la nueva fecha
    const { ...eventWithoutId } = eventToEdit; // ✅ Eliminamos `id` del objeto

    const newEvent: SelectEvent = {
      ...eventWithoutId,
      dateFrom: newDateFrom.toISOString(),
      dateTo: newDateTo.toISOString(),
    };
    console.log("✅ Evento copiado correctamente, sin ID:", newEvent);
    
    setEventToEdit(newEvent);
    setSelectedDate(newDateFrom);
    setIsCardComposeOpen(true);
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
              onEdit={() => handleEdit(evento)}
              onDelete={() => handleDelete(evento.id)}
              onCopyToNextDay={() => copyEventToNextDay(evento)}
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
              onEventUpdated(newEvent);
            } else {
              console.log("Nuevo evento creado:", newEvent);
            }
            setIsCardComposeOpen(false);
          }}
          eventToEdit={eventToEdit || null}
        />
      )}
    </div>
  );
};
