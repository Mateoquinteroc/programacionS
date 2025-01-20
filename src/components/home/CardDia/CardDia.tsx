"use client";

import React, { useEffect, useState } from "react";
import styles from "./CardDia.module.sass";
import { SelectEvent } from "app/db/schema";
import { format, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";
import { EventsContainer } from "../EventsContainer/EventsContainer";

export const CardDia = ({
  eventos: initialEvents, // Renombramos para diferenciar iniciales
  onSelect,
  isAdminMode,
  from,
  to,
}: {
  eventos: SelectEvent[];
  onSelect: (event: SelectEvent | null) => void;
  isAdminMode: boolean;
  from: Date;
  to: Date;
}) => {
  const [currentEvents, setCurrentEvents] = useState<SelectEvent[]>([]);

  useEffect(() => {
    setCurrentEvents(initialEvents); // Inicializar el estado con eventos recibidos
  }, [initialEvents]);

  if (!currentEvents.length && !isAdminMode) {
    return <p>No hay eventos disponibles</p>;
  }

  // Agrupar eventos por día
  const eventsByDay = currentEvents.reduce(
    (prev: Record<string, { date: Date; eventos: SelectEvent[] }>, curr) => {
      const day = format(curr.dateFrom, "iiii d", { locale: es });
      if (!prev[day]) {
        prev[day] = { date: curr.dateFrom, eventos: [curr] };
      } else {
        prev[day].eventos.push(curr);
      }
      return prev;
    },
    {}
  );

  // Calcular días de la semana completa en base a `from` y `to`
  const fullWeekDays = () => {
    const days = eachDayOfInterval({ start: from, end: to });
    return days.map((date) => {
      const dayKey = format(date, "iiii d", { locale: es });
      return {
        dayKey,
        date,
        eventos: eventsByDay[dayKey]?.eventos || [],
      };
    });
  };

  const daysToRender = isAdminMode
    ? fullWeekDays()
    : Object.entries(eventsByDay).map(([dayNumber, { date, eventos }]) => ({
        dayKey: dayNumber,
        date,
        eventos,
      }));

  const handleEventUpdate = (updatedEvent: SelectEvent | null) => {
    if (!updatedEvent) return;

    setCurrentEvents((prevEvents) => {
      const existingIndex = prevEvents.findIndex(
        (event) => event.id === updatedEvent.id
      );

      if (existingIndex !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingIndex] = updatedEvent;
        return updatedEvents;
      } else {
        return [...prevEvents, updatedEvent];
      }
    });
  };

  return (
    <div className={styles.container}>
      {daysToRender.map(({ dayKey, date, eventos }) => (
        <div key={dayKey} className={styles.dayContainer}>
          <h2 className={styles.dayTitle}>
            {format(date, "iiii d", { locale: es })}
          </h2>
          <EventsContainer
            eventos={eventos}
            onSelect={onSelect}
            isAdminMode={isAdminMode}
            day={date}
            onEventUpdated={handleEventUpdate}
          />
        </div>
      ))}
    </div>
  );
};
