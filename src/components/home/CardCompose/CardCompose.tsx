"use client";

import { useState, useEffect } from "react";
import styles from "./CardCompose.module.sass";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format, set, parseISO } from "date-fns";
import { UploadDropzone } from "../../../utils/uploadthing";
import Image from "next/image";
import { SelectEvent } from "app/db/schema";
import { saveEvent } from "../EventsContainer/eventUtilis";
import { colorByType } from "../consts";
import { withLoading } from "../../../utils/loadingMiddleware";
import { Spinner } from "app/components/Spinner/Spinner";

interface CardComposeProps {
  date: Date;
  onClose: () => void;
  onEventCreated: (newEvent: SelectEvent) => void;
  onEventSaved?: (event: SelectEvent) => void;
  eventToEdit?: SelectEvent | null;
}

export const CardCompose = ({
  date,
  onClose,
  onEventCreated,
  onEventSaved,
  eventToEdit,
}: CardComposeProps) => {
  // Se determina el modo edición:
  // Si eventToEdit existe y su id es mayor que 0, estamos en modo edición;
  // De lo contrario, es creación o copia.
  const isEdit = !!(eventToEdit && eventToEdit.id > 0);

  // Estados del formulario con tipos definidos para que TypeScript reconozca los valores literales
  const [category, setCategory] = useState<
    | "exposicion"
    | "foro"
    | "concierto"
    | "taller"
    | "congreso"
    | "jornadasAcademicas"
    | "varios"
  >("concierto");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [place, setPlace] = useState<
    | "auditorio"
    | "maker"
    | "oculo"
    | "sala_principal"
    | "sala_alterna"
    | "sala_capacitaciones"
    | "vestibulo_piso1"
    | "vestibulo_piso2"
    | "vestibulo_piso3"
    | "vestibulo_piso4"
    | "auditorio_aire"
    | "cafe_cultural"
  >("auditorio");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [detail, setDetail] = useState<"abierto" | "cerrado" | null>("abierto");
  const [eventDate, setEventDate] = useState<string>(
    format(date, "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventToEdit) {
      setCategory(eventToEdit.type || "concierto");
      setImageUrl(eventToEdit.imageUrl || "");
      setPlace(eventToEdit.location || "auditorio");
      setTitle(eventToEdit.title || "");
      setDescription(eventToEdit.description || "");
      setDetail(eventToEdit.detail || "abierto");

      // Se usan las fechas y horarios tal cual vienen en eventToEdit.
      setEventDate(format(new Date(eventToEdit.dateFrom), "yyyy-MM-dd"));
      setStartTime(format(new Date(eventToEdit.dateFrom), "HH:mm"));
      setEndTime(format(new Date(eventToEdit.dateTo), "HH:mm"));
    } else {
      setEventDate(format(date, "yyyy-MM-dd"));
    }
  }, [eventToEdit, date]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateFrom = set(parseISO(eventDate), {
        hours: parseInt(startTime.split(":")[0], 10),
        minutes: parseInt(startTime.split(":")[1], 10),
      });
      const dateTo = set(parseISO(eventDate), {
        hours: parseInt(endTime.split(":")[0], 10),
        minutes: parseInt(endTime.split(":")[1], 10),
      });

      const eventData = {
        ...(isEdit && eventToEdit?.id ? { id: eventToEdit.id } : {}),
        type: category,
        dateFrom: dateFrom,
        dateTo: dateTo,
        title,
        location: place,
        detail,
        imageUrl,
        description,
      };

      const result = await withLoading(
        () => saveEvent(eventData, isEdit),
        setLoading
      );

      if (isEdit) {
        if (onEventSaved) {
          onEventSaved(result);
        }
        window.location.reload();
      } else {
        onEventCreated(result);
        window.location.reload();
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  return (
    <div className={styles.cardComposeContainer}>
      <aside
        className={styles.cardComposeContainerForm}
        style={{ backgroundColor: colorByType[category] }}
      >
        <XMarkIcon className={styles.closeIcon} onClick={onClose} />
        <div className={styles.column1}>
          <h1>Imagen</h1>
          {imageUrl ? (
            <Image
              className="inputimage"
              src={imageUrl}
              alt="Imagen de evento"
              width={300}
              height={0}
              layout="intrinsic"
            />
          ) : (
            <UploadDropzone
              appearance={{
                button: {
                  color: "white",
                  backgroundColor: "#4285F4",
                  height: "50px",
                  width: "100%",
                  borderRadius: "10px",
                },
              }}
              className={styles.uploadButton}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setImageUrl(res[0].url)}
              onUploadError={(error: Error) =>
                console.error(`Error al subir la imagen: ${error.message}`)
              }
            />
          )}
        </div>
        <div className={styles.column2}>
          <h1>Fecha del evento</h1>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={styles.input}
            required
          />
          <h1>Hora de inicio</h1>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={styles.input}
            required
          />
          <h1>Hora de fin</h1>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={styles.input}
            required
          />
          <h1>Título del evento</h1>
          <input
            type="text"
            placeholder="Título del evento"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <h1>Categoría</h1>
          <select
            className={styles.select}
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "exposicion"
                  | "foro"
                  | "concierto"
                  | "taller"
                  | "congreso"
                  | "jornadasAcademicas"
                  | "varios"
              )
            }
            required
          >
            <option value="exposicion">Exposición</option>
            <option value="foro">Foro</option>
            <option value="concierto">Concierto</option>
            <option value="taller">Taller</option>
            <option value="congreso">Congreso</option>
            <option value="jornadasAcademicas">Jornadas Académicas</option>
            <option value="varios">Varios</option>
          </select>
          <h1>Lugar</h1>
          <select
            className={styles.input}
            value={place}
            onChange={(e) =>
              setPlace(
                e.target.value as
                  | "auditorio"
                  | "maker"
                  | "oculo"
                  | "sala_principal"
                  | "sala_alterna"
                  | "sala_capacitaciones"
                  | "vestibulo_piso1"
                  | "vestibulo_piso2"
                  | "vestibulo_piso3"
                  | "vestibulo_piso4"
                  | "auditorio_aire"
                  | "cafe_cultural"
              )
            }
            required
          >
            <option value="auditorio">Auditorio</option>
            <option value="maker">Maker</option>
            <option value="oculo">Óculo</option>
            <option value="sala_principal">Sala de exposiciones</option>
            <option value="sala_alterna">Sala alterna</option>
            <option value="sala_capacitaciones">Sala de capacitaciones</option>
            <option value="vestibulo_piso1">Vestíbulo primer piso</option>
            <option value="vestibulo_piso2">Vestíbulo segundo piso</option>
            <option value="vestibulo_piso3">Vestíbulo tercer piso</option>
            <option value="vestibulo_piso4">Vestíbulo cuarto piso</option>
            <option value="auditorio_aire">Auditorio al aire libre</option>
            <option value="cafe_cultural">Café Cultural</option>
          </select>
        </div>
        <div className={styles.column3}>
          <h1>Descripción</h1>
          <textarea
            placeholder="Descripción del evento"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={handleSave}
            className={styles.button}
            disabled={loading}
          >
            {loading ? <Spinner /> : isEdit ? "Guardar Cambios" : "Guardar"}
          </button>
        </div>
      </aside>
    </div>
  );
};
