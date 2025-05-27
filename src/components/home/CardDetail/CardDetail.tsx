"use client";


import {
  XMarkIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import styles from "./CardDetail.module.sass";
import { SelectEvent } from "app/db/schema";
import { CardDetailContainer } from "../CardDetailContainer/CardDetailContainer";
import { CardDiaCarrucelEvents } from "../CardDiaCarrucelEvents/CardDiaCarrucelEvents";

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
      <CardDetailContainer eventos={eventos} selectedEvent={selectedEvent} onSelect={onSelect} />
      )
      <CardDiaCarrucelEvents eventos={eventos} selectedEvent={selectedEvent} onSelect={onSelect} />
    </aside>
  );
};
