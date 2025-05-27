import { FC } from "react";
import { SelectEvent } from "app/db/schema";
import { colorByType, locationTranslations } from "../consts";
import styles from "../CardDetail/CardDetail.module.sass";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Capitaliza la primera letra
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type Props = {
  eventos: SelectEvent[];
  selectedEvent: SelectEvent;
  onSelect: (evento: SelectEvent | null) => void;
};

export const CardDiaCarrucelEvents: FC<Props> = ({
  eventos,
  onSelect,
}) => {
  return (
    <aside className={styles.scrollableEventList}>
      {eventos.map((evento) => (
        <div key={evento.id} className={styles.eventContainer}>
          <div
            className={styles.eventCard}
            style={{ backgroundColor: colorByType[evento.type] }}
            onClick={() => onSelect(evento)}
          >
            <div className={styles.eventDateContainer}>
              <p className={styles.eventDate}>
                {format(evento.dateFrom, "d", { locale: es })}
              </p>
              <p className={styles.eventDateDay}>
                {capitalize(format(evento.dateFrom, "iiii", { locale: es }))}
              </p>
            </div>
            <div className={styles.eventDataContainer}>
              <p
                className={styles.eventTitle}
                style={{ color: colorByType[evento.type] }}
              >
                {evento.title}
              </p>
              <p className={styles.eventLocation}>
                {locationTranslations[evento.location]}
              </p>
              <p className={styles.eventTime}>
                {format(evento.dateFrom, "hh:mm a", { locale: es })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};
