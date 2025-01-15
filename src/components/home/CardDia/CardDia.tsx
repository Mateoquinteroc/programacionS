"use client";

import React from "react";
import styles from "./CardDia.module.sass";
import { SelectEvent } from "app/db/schema";
import { colorByType,locationTranslations } from "../consts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const CardDia = ({
  eventos,
  onSelect
}: {
  eventos: SelectEvent[];
  onSelect:(event:SelectEvent)=>void
}) => {

  if (!eventos.length) return <p>No hay eventos disponibles</p>;

  const eventsByDay = eventos.reduce(
    (prev: Record<string,{date: Date; eventos: SelectEvent[]}>, curr) => {
      const day = format(curr.dateFrom, "iiii d", { locale: es });
      if (!prev[day]) {
        prev[day] = {date: curr.dateFrom, eventos: [curr] };
      } else {
        prev[day].eventos.push(curr);
      }

      return prev;
    },
    {}
  );
  console.log()

  return (
    <div className={styles.container}>
      {Object.entries(eventsByDay).map(([dayNumber,{ date, eventos}]) => (
        <div key={dayNumber} className={styles.dayContainer}>
          <h2 className={styles.dayTitle}>{format(date, "iiii d", { locale: es })}</h2>
          <div className={styles.eventsContainer}>
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className={styles.eventCard}
                style={{
                  backgroundColor:
                    colorByType[evento.type],
                }}
                onClick={()=>onSelect(evento)}
                
              >
                <p className={styles.eventTitle}>{evento.title}</p>
                <p className={styles.eventHour}>{format(evento.dateFrom,'hh:mm a',{locale:es})}</p>
                <p className={styles.eventPlace}>{locationTranslations[evento.location]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
