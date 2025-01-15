"use client"

import { SelectEvent } from "app/db/schema";
import { CardDia } from "./CardDia";
import { CardDetail } from "./CardDetail";
import { useEffect, useRef, useState } from "react";


const KEEP_OPEN_TIMEOUT = 60_000 * 2;
export const Home = ({ events }: { events: SelectEvent[] }) => {
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
      <CardDia eventos={events} onSelect={setSelectedEvent} />
      {selectedEvent !== null && (
        <CardDetail
          eventos={events}
          selectedEvent={selectedEvent}
          onSelect={setSelectedEvent}
        />
      )}
    </>
  );
};
