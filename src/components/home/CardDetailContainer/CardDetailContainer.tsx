import { SelectEvent } from "app/db/schema";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDetail/CardDetail.module.sass";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const CardDetailContainer = ({
  selectedEvent,
}: {
  eventos: SelectEvent[];
  selectedEvent: SelectEvent;
  onSelect: (index: SelectEvent | null) => void;
}) => {
  return (
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
};