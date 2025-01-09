import {XMarkIcon,ArrowSmallRightIcon, ArrowSmallLeftIcon,} from "@heroicons/react/24/solid";
import React, { useContext, useEffect } from "react";
import { CardSelectContext } from "app/components/home/Context/Context";
import styles from "./CardDetail.module.sass";
import Image from "next/image";

const colorMap: Record<string, string> = {
  "bg-naranja": "#ec6e25",
  "bg-rojo": "#cd1532",
  "bg-amarillo": "#f7aa24",
  "bg-azul": "#1843ce",
  "bg-magenta": "#e73944",
  "bg-violeta": "#472d52",
}

export const CardDetail = ({ eventos }) => {
  const Context = useContext(CardSelectContext);

  if (!Context) {
    console.error("Contexto no está definido");
    return null;
  }

  // Función para seleccionar un evento
  const selectorEvento = (eventoDetallado: Evento) => {
    if (!eventoDetallado) {
      console.warn("Evento no válido seleccionado");
      return;
    }
    Context.setEventSelect(eventoDetallado);
  };

  const Imagen: string | undefined = Context?.eventSelect?.image

  // Función para avanzar al siguiente evento
  const siguienteCard = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextIndex = (Context.currentIndex + 1) % eventos.length;
    const nextEvent = eventos[nextIndex];
    Context.setCurrentIndex(nextIndex);
    Context.setEventSelect(nextEvent);
  };

  // Función para retroceder al evento anterior
  const anteriorCard = (event: React.MouseEvent) => {
    event.preventDefault();
    const beforeIndex = (Context.currentIndex - 1 + eventos.length) % eventos.length;
    const beforeEvent = eventos[beforeIndex];
    Context.setCurrentIndex(beforeIndex);
    Context.setEventSelect(beforeEvent);
  };

  useEffect(() => {
    if (Context?.eventSelect) {

    }
  }, [Context?.eventSelect]); 

  return (
    <aside
      className={`${Context.isCardDetailOpen ? styles.flex : styles.hidden} ${styles.cardDetailContainer}`}
    >
      <XMarkIcon
        className={styles.closeIcon}
        onClick={() => Context.closeCardDetail()}
      />
      <ArrowSmallLeftIcon
        className={styles.prevIcon}
        onClick={(event) => anteriorCard(event)}
      />
      <ArrowSmallRightIcon
        className={styles.nextIcon}
        onClick={(event) => siguienteCard(event)}
      />
      {Context.eventSelect && (
        <div
          className={`${styles.eventCardDetail}`}
          style={{ backgroundColor: colorMap[Context.eventSelect.color] || "#cccccc" }}
          onClick={(event) => siguienteCard(event)}
        >

          <figure className={styles.eventImageContainer}>
            <Image
              src={Imagen|| "/images/pexels-michelangelo-buonarroti-8728382.jpg"}
              className={styles.eventImage}
              alt={Context.eventSelect.title|| "Evento"}
              width={500}
              height={500}
            />
          </figure>
          <p className={styles.eventDatePanel}>
            {Context.eventSelect.date}
            <br />
            {Context.eventSelect.month}
          </p>
          <p className={styles.eventTimePanel}>{Context.eventSelect.hour}</p>
          <p className={styles.eventTitlePanel}>{Context.eventSelect.title}</p>
          <p className={styles.eventDetailsPanel}>{Context.eventSelect.detail}</p>
          <p className={styles.eventLocationPanel}>{Context.eventSelect.place}</p>
          <h2 className={styles.eventDescriptionTitle}>Descripción</h2>
          <p className={styles.eventDescriptionPanel}>{Context.eventSelect.description}</p>
        </div>
      )}
      <aside className={styles.scrollableEventList}>
        {eventos.map((evento, index) => (
          <div key={index} className={styles.eventContainer}>
            <div
              className={`${styles.eventCard} ${evento.color}`}
              onClick={() => selectorEvento(evento)}
              style={{ backgroundColor: colorMap[evento.color] || "#cccccc" }}
            >
              <h2 className={styles.eventType}>{evento.type}</h2>
              <p className={styles.eventDate}>{evento.date}</p>
              <p className={styles.eventTime}>{evento.hour}</p>
              <p className={styles.eventTitle}>{evento.title}</p>
              <p className={styles.eventLocation}>{evento.place}</p>
            </div>
          </div>
        ))}
      </aside>
    </aside>
  );
};
