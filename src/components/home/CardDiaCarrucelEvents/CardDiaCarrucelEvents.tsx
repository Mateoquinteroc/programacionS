import { SelectEvent } from "app/db/schema";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDetail/CardDetail.module.sass";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const CardDiaCarrucelEvents = ({
  eventos,
  onSelect,
}: {
  eventos: SelectEvent[];
  selectedEvent: SelectEvent;
  onSelect: (index: SelectEvent | null) => void;
}) => {
  return (
    <aside className={styles.scrollableEventList}>
      {eventos.map((evento) => (
        <div key={evento.id} className={styles.eventContainer}>
          <div
            className={`${styles.eventCard} ${colorByType[evento.type]}`}
            onClick={() => onSelect(evento)}
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
  );
};
