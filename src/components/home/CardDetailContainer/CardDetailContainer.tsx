import { SelectEvent } from "app/db/schema";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDetail/CardDetail.module.sass";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// 🔠 Función para capitalizar
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const CardDetailContainer = ({
  selectedEvent,
}: {
  eventos: SelectEvent[];
  selectedEvent: SelectEvent;
  onSelect: (index: SelectEvent | null) => void;
}) => {
  return (
    <div className={styles.eventCardDetail}>
      <figure className={styles.eventImageContainer}>
        <Image
          src={
            selectedEvent.imageUrl ||
            "/images/pexels-hilal-2150529123-32254057.jpg"
          }
          className={styles.eventImage}
          style={{
            border: `clamp(2px, 0.3vw, 1rem) solid ${colorByType[selectedEvent.type]}`,
            borderRadius: "1rem",
          }}
          alt={selectedEvent.title}
          width={100}
          height={100}
        />
      </figure>

      <p
        className={styles.eventTitlePanel}
        style={{ color: colorByType[selectedEvent.type] }}
      >
        {selectedEvent.title}
      </p>

      <p className={styles.eventDescriptionPanel}>
        {selectedEvent.description}
      </p>

      <div className={styles.eventDateWrapper}>
        <p
          className={styles.eventDatePanel}
          style={{ color: colorByType[selectedEvent.type] }}
        >
          {format(selectedEvent.dateFrom, "d", { locale: es })}
        </p>
        <div>
          <p
            className={styles.eventMonDay}
            style={{ color: colorByType[selectedEvent.type] }}
          >
            {capitalize(format(selectedEvent.dateFrom, "LLLL", { locale: es }))}
          </p>
          <h2 className={styles.dayTitle}>
            {capitalize(format(selectedEvent.dateFrom, "iiii", { locale: es }))}
          </h2>
        </div>
      </div>

      <p className={styles.eventLocationPanel}>
        Lugar : {locationTranslations[selectedEvent.location]}
      </p>
      <p className={styles.eventTimePanel}>
        de {format(selectedEvent.dateFrom, "hh:mm a", { locale: es })} -{" "}
        {format(selectedEvent.dateTo, "hh:mm a", { locale: es })}
      </p>
    </div>
  );
};
