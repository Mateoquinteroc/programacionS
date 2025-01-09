"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./CardDia.module.sass";
import { CardSelectContext } from "../Context/Context";

const colorMap: Record<string, string> = {
  "bg-naranja": "#ec6e25",
  "bg-rojo": "#cd1532",
  "bg-amarillo": "#f7aa24",
  "bg-azul": "#1843ce",
  "bg-magenta": "#e73944",
  "bg-violeta": "#472d52",
};

interface Event {
  id: number;
  type: string;
  date: string;
  month: string;
  hour: string;
  title: string;
  place: string;
  detail: string | null;
  color: string | null;
  image: string | null;
  description: string | null;
  dayId: number;
}

export const CardDia = () => {
  const [categories, setCategories] = useState<Record<string, Event[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const Context = useContext(CardSelectContext);

  // Lógica para seleccionar el primer y último evento al cargar
  const seleccionarEventos = (data: Record<string, Event[]>) => {
    const allEvents = Object.values(data).flat(); // Aplana los eventos
    if (allEvents.length > 0) {
      // Ordenar por `id` ascendente para obtener el primer evento
      const firstEvent = allEvents.sort((a, b) => a.id - b.id)[0];
      console.log("Primer evento:", firstEvent);
      Context?.setFirstEvent(firstEvent); // Guardar el primer evento en el contexto

      // Ordenar por `id` descendente para obtener el último evento
      const lastEvent = allEvents.sort((a, b) => b.id - a.id)[0];
      console.log("Último evento:", lastEvent);
      Context?.setLastEvent(lastEvent); // Guardar el último evento en el contexto
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events"); // Llama al endpoint de eventos
        if (!response.ok) throw new Error("Error al cargar los eventos");

        const data = await response.json();
        setCategories(data); // Almacena los datos en el estado local

        seleccionarEventos(data); // Selecciona el primer y último evento
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const verEventoSeleccionado = (eventoDetalle: Event) => {
    Context?.openCardDetail();
    Context?.setEventSelect(eventoDetalle);
    console.log("Evento seleccionado manualmente:", eventoDetalle);
  };

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>{error}</p>;
  if (!categories) return <p>No hay eventos disponibles</p>;

  // Filtrar días sin eventos
  const filteredCategories = Object.entries(categories).filter(
    ([, eventos]) => eventos.length > 0
  );

  return (
    <div className={styles.container}>
      {filteredCategories.map(([dayName, eventos]) => (
        <div key={dayName} className={styles.dayContainer}>
          <h2 className={styles.dayTitle}>{dayName}</h2>
          <div className={styles.eventsContainer}>
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className={styles.eventCard}
                style={{ backgroundColor: colorMap[evento.color || "bg-default"] || "#cccccc" }}
                onClick={() => verEventoSeleccionado(evento)}
              >
                <p className={styles.eventTitle}>{evento.title}</p>
                <p className={styles.eventHour}>{evento.hour}</p>
                <p className={styles.eventPlace}>{evento.place}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
