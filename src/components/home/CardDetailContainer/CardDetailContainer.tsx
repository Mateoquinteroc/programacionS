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
        // style={{ backgroundColor: colorByType[selectedEvent.type] }}
      >
        <figure className={styles.eventImageContainer}>
          <Image
            src={
              selectedEvent.imageUrl ||
              "/images/pexels-michelangelo-buonarroti-8728382.jpg"
            }
            className={styles.eventImage}
            style={{
              border: `5px solid ${colorByType[selectedEvent.type]}`,
              borderRadius: "1rem"
            }}
            alt={selectedEvent.title}
            width={500}
            height={500}
          />
        </figure>
        <div className={styles.eventDateWrapper}>
          <p className={styles.eventDatePanel}
          style={{ color: colorByType[selectedEvent.type] }}
          >
            {format(selectedEvent.dateFrom, "d", { locale: es })}
          </p>
          <div>
              <p className={styles.eventMonDay}
            style={{ color: colorByType[selectedEvent.type] }}
            >
              {format(selectedEvent.dateFrom, "LLLL", { locale: es })}
            </p>
            <h2 className={styles.dayTitle}>
              {format(selectedEvent.dateFrom, "iiii ", { locale: es })}
            </h2>
          </div>
        </div>

        <p className={styles.eventTitlePanel}
        style={{ color: colorByType[selectedEvent.type] }}>
          {selectedEvent.title}</p>
        <p className={styles.eventTitlePanel}>{selectedEvent.title}</p>
        <p className={styles.eventDescriptionPanel}>
          {selectedEvent.description}
        </p>
        <p className={styles.eventLocationPanel}>Lugar : {""}
          {locationTranslations[selectedEvent.location]}
        </p>
        <p className={styles.eventTimePanel}>de {""}
          {format(selectedEvent.dateFrom, "hh:mm a", { locale: es })} -{" "}
          {format(selectedEvent.dateTo, "hh:mm a", { locale: es })}
        </p>

        {/* <p className={styles.eventDetailsPanel}>{`${selectedEvent.detail} al publico`}</p> */}
        {/* <h2 className={styles.eventDescriptionTitle}>Descripción</h2> */}
      </div>
  )
};