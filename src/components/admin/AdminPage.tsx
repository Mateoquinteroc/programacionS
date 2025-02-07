"use client";

import { Fondo } from "app/components/home";
import { PrincipalCard } from "app/components/home/PrincipalCard";
import { endOfWeek, startOfWeek, addWeeks, subWeeks } from "date-fns";
import PanelAdminClient from "./PanelDiaCliente";
import PanelDias from "./PanelDias";
import { useEffect, useState } from "react";
import { SelectEvent } from "app/db/schema";
import { useSession, signIn } from "next-auth/react";

const now = new Date();

export default function PanelAdmin() {
  const { data: session, status } = useSession();
  const [from, setFrom] = useState<Date>(startOfWeek(now, { weekStartsOn: 1 }));
  const to: Date = endOfWeek(from, { weekStartsOn: 1 });
  const [events, setEvents] = useState<SelectEvent[]>([]);
  const isAdminMode: boolean = true; // Declaración explícita del tipo

  useEffect(() => {
    if (session) {
      const toDate = endOfWeek(from, { weekStartsOn: 1 });
      // Solo cargar eventos si el usuario está autenticado
      fetch(
        `/api/events?${new URLSearchParams({
          from: from.toISOString(),
          to: toDate.toISOString(),
        }).toString()}`
      )
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
        });
    }
  }, [from,session]);

  // Estado de carga mientras se valida la sesión
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  // Redirigir o mostrar login si no hay sesión
  if (!session) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Fondo />
        <h1>Iniciar Sesión</h1>
        <button
          onClick={() => signIn("google")} // Cambia "google" según tu proveedor
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#4285F4",
            color: "white",
            cursor: "pointer",
          }}
        >
          Inicia sesión con Google
        </button>
      </div>
    );
  }

  // Contenido del componente si el usuario está autenticado
  return (
    <div>
      <PrincipalCard from={from} to={to} />
      <PanelAdminClient
        setNextWeek={() => {
          setFrom(addWeeks(from, 1));
        }}
        setPrevWeek={() => {
          setFrom(subWeeks(from, 1));
        }}
      />
      <PanelDias events={events} isAdminMode={isAdminMode} from={from} to={to} />
      <Fondo />
    </div>
  );
}
