"use client";

import React, { useEffect, useState } from "react";
import styles from "./CardDia.module.sass";
import { SelectEvent } from "app/db/schema";
import { format, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";
import { EventsContainer } from "../EventsContainer/EventsContainer";

// 🔠 Función para poner en mayúscula la primera letra
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const CardDia = ({
  eventos: initialEvents,
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
    setCurrentEvents(initialEvents);
  }, [initialEvents]);

  if (!currentEvents.length && !isAdminMode) {
    return <p>No hay eventos disponibles</p>;
  }

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
            {capitalize(format(date, "iiii d", { locale: es }))}
          </h2>
          <EventsContainer
            eventos={eventos}
            onSelect={onSelect}
            isAdminMode={isAdminMode}
            day={date}
            onEventUpdated={handleEventUpdate}
          />
          <div className={styles.eventStripeFixed}>
            <div className={styles.colorBlockYellow}></div>
            <div className={styles.colorBlockOrange}></div>
            <div className={styles.colorBlockPink}></div>
            <div className={styles.colorBlockRed}></div>
            <div className={styles.colorBlockWine}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
