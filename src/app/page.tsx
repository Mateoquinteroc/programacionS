"use client";

import { useEffect, useState } from "react";
import { Fondo } from "app/components/home";
import { CardDetail } from "app/components/home/CardDetail";
import { CardDia } from "app/components/home/CardDia";
import { PrincipalCard } from "app/components/home/PrincipalCard";
import { CardSelectProvider } from "app/components/home/Context/Context";
import { FooterCard } from "app/components/home/FooterCard/FooterCard"


// Define los tipos para eventos y días
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

export default function Home() {
  const [eventsByDay, setEventsByDay] = useState<Record<string, Event[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtener los datos de la API
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events"); // Ruta del API Route
        if (!response.ok) throw new Error("Error al obtener los eventos");
        const data = await response.json();

        // Eliminar duplicados de días y agrupar eventos correctamente
        const uniqueDays: Record<string, Event[]> = {};
        Object.entries(data).forEach(([dayName, events]) => {
          if (!uniqueDays[dayName]) {
            uniqueDays[dayName] = events as Event[];
          }
        });

        setEventsByDay(uniqueDays); // Actualiza el estado con días únicos
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false); // Detener el estado de carga
      }
    };

    fetchEvents();

    // Agregar un listener global para capturar clics
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementInfo = target.id || target.className || target.tagName;

      // Aquí puedes registrar el evento (por ejemplo, enviar a Google Analytics)
      console.log("Click en:", elementInfo);
    };
    
    // Añadir el evento global de clic
    document.addEventListener("click", handleClick);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (loading) {
    return <p>Cargando eventos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <CardSelectProvider>
      <main>
        <Fondo />
        <PrincipalCard />
        <FooterCard />
        <CardDetail eventos={Object.values(eventsByDay).flat()} />
        <div>
            <CardDia/>
        </div>
      </main>
    </CardSelectProvider>
  );
}


