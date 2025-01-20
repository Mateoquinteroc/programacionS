"use client";

import { SelectEvent } from "app/db/schema";
import { CardDia } from "./CardDia";
import { CardDetail } from "./CardDetail";
import { useEffect, useRef, useState } from "react";

const KEEP_OPEN_TIMEOUT = 60_000 * 2;

export const Home = ({
  events,
  isAdminMode,
  from,
  to,
}: {
  events: SelectEvent[];
  isAdminMode: boolean;
  from: Date;
  to: Date;
}) => {
  const [selectedEvent, setSelectedEvent] = useState<SelectEvent | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedEvent === null) {
      return;
    }

    setTimeout(() => {
      setSelectedEvent(null);
    }, KEEP_OPEN_TIMEOUT);
  }, [selectedEvent]);

  return (
    <>
      {/* Pasamos eventos, rango de fechas y estado de administración */}
      <CardDia
        eventos={events}
        isAdminMode={isAdminMode}
        onSelect={setSelectedEvent}
        from={from}
        to={to}
      />
      {selectedEvent !==  null && (
        <CardDetail
          eventos={events}
          selectedEvent={selectedEvent}
          onSelect={setSelectedEvent}
        />
      )}
    </>
  );
};
