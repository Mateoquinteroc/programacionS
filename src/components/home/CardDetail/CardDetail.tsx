"use client";

import {
  XMarkIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import styles from "./CardDetail.module.sass";
import Image from "next/image";
import { SelectEvent } from "app/db/schema";
import { colorByType, locationTranslations } from "../consts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const CardDetail = ({
  eventos,
  selectedEvent,
  onSelect,
}: {
  eventos: SelectEvent[];
  selectedEvent: SelectEvent;
  onSelect: (index: SelectEvent | null) => void;
}) => {

  const selectedEventIndex = eventos.findIndex(evento => evento.id ===selectedEvent.id)

  return (
    <aside className={`${styles.flex}  ${styles.cardDetailContainer}`}>
      <XMarkIcon className={styles.closeIcon} onClick={() => onSelect(null)} />
      <ArrowSmallLeftIcon
        className={styles.prevIcon}
        onClick={() => onSelect(eventos[(selectedEventIndex - 1 + eventos.length)% eventos.length])}
      />
      <ArrowSmallRightIcon
        className={styles.nextIcon}
        onClick={() => onSelect(eventos[(selectedEventIndex + 1)% eventos.length])}
      />
      (
      <div
        className={`${styles.eventCardDetail}`}
        style={{ backgroundColor: colorByType[selectedEvent.type] }}
      >
        <figure className={styles.eventImageContainer}>
          <Image
            src={
              selectedEvent.imageUrl ||
              "/images/pexels-michelangelo-buonarroti-8728382.jpg"
            }
            className={styles.eventImage}
            alt={selectedEvent.title}
            width={500}
            height={500}
          />
        </figure>
        <p className={styles.eventDatePanel}>
          {format(selectedEvent.dateFrom, "iiii d", { locale: es })}
          <br />
          {format(selectedEvent.dateFrom, "LLLL", { locale: es })}
        </p>
        <p className={styles.eventTimePanel}>
          {format(selectedEvent.dateFrom, "hh:mm a", { locale: es })} -{" "}
          {format(selectedEvent.dateTo, "hh:mm a", { locale: es })}
        </p>
        <p className={styles.eventTitlePanel}>{selectedEvent.title}</p>
        <p className={styles.eventTitlePanel}>{selectedEvent.title}</p>
        <p className={styles.eventDetailsPanel}>{`${selectedEvent.detail} al publico`}</p>
        <p className={styles.eventLocationPanel}>
          {locationTranslations[selectedEvent.location]}
        </p>
        <h2 className={styles.eventDescriptionTitle}>Descripción</h2>
        <p className={styles.eventDescriptionPanel}>
          {selectedEvent.description}
        </p>
      </div>
      )
      <aside className={styles.scrollableEventList}>
        {eventos.map((evento) => (
          <div key={evento.id} className={styles.eventContainer}>
            <div
              className={`${styles.eventCard} ${
                colorByType[evento.type]
              }`}
              onClick={() => onSelect(evento )}
              style={{ backgroundColor: colorByType[evento.type] }}
            >
              <h2 className={styles.eventType}>{evento.type}</h2>
              <p className={styles.eventDate}>
                {format(evento.dateFrom, "iiii d", { locale: es })}
              </p>
              <p className={styles.eventTime}>
                {format(evento.dateFrom, "hh:mm a", { locale: es })}
              </p>
              <p className={styles.eventTitle}>{evento.title}</p>
              <p className={styles.eventLocation}>
                {locationTranslations[evento.location]}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </aside>
  );
};
