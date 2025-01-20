"use client";

import { useState, useEffect } from "react";
import styles from "./CardCompose.module.sass";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format, set, parseISO } from "date-fns";
import { UploadButton } from "../../../utils/uploadthing";
import Image from "next/image";
import { SelectEvent } from "app/db/schema";
import { saveEvent } from "../EventsContainer/eventUtilis";
import { colorByType } from "../consts";

export const CardCompose = ({
  date,
  onClose,
  onEventCreated,
  eventToEdit,
}: {
  date: Date;
  onClose: () => void;
  onEventSaved: (event: SelectEvent) => void;
  onEventCreated: (newEvent: SelectEvent) => void;
  eventToEdit?: SelectEvent | null; // Prop opcional para edición
}) => {
  const [category, setCategory] = useState<string>("concierto");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [place, setPlace] = useState<string>("auditorio");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [detail, setDetail] = useState<string>("abierto");
  const [eventDate, setEventDate] = useState<string>(
    eventToEdit
      ? format(new Date(eventToEdit.dateFrom), "yyyy-MM-dd")
      : format(date, "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState<string>(
    eventToEdit ? format(new Date(eventToEdit.dateFrom), "HH:mm") : "09:00"
  );
  const [endTime, setEndTime] = useState<string>(
    eventToEdit ? format(new Date(eventToEdit.dateTo), "HH:mm") : "10:00"
  );

  // Cargar los datos en caso de edición
  useEffect(() => {
    if (eventToEdit) {
      setCategory(eventToEdit.type);
      setImageUrl(eventToEdit.imageUrl || "");
      setPlace(eventToEdit.location);
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description || "");
      setDetail(eventToEdit.detail || "abierto");
      setEventDate(format(new Date(eventToEdit.dateFrom), "yyyy-MM-dd"));
      setStartTime(format(new Date(eventToEdit.dateFrom), "HH:mm"));
      setEndTime(format(new Date(eventToEdit.dateTo), "HH:mm"));
    }
  }, [eventToEdit]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Combinar fecha y hora, y normalizar para que coincidan con la zona horaria local del cliente
      const dateFrom = set(parseISO(eventDate), {
        hours: parseInt(startTime.split(":")[0], 10),
        minutes: parseInt(startTime.split(":")[1], 10),
      });

      const dateTo = set(parseISO(eventDate), {
        hours: parseInt(endTime.split(":")[0], 10),
        minutes: parseInt(endTime.split(":")[1], 10),
      });

      const eventData = {
        id: eventToEdit?.id,
        type: category,
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        title,
        location: place,
        detail,
        imageUrl,
        description,
      };

      const result = await saveEvent(eventData, !!eventToEdit);

      if (eventToEdit) {
        window.location.reload(); // Actualizar la página
      } else {
        onEventCreated(result); // Notificar al padre en caso de creación
        window.location.reload(); // Actualizar la página
      }

      onClose(); // Cerrar el formulario
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

        <div className={styles.content}>
          <h2 className={styles.title}>
            {eventToEdit ? "Editar Evento" : "Crear Evento"}
          </h2>

          <form className={styles.form} onSubmit={handleSave}>
            {imageUrl && (
              <div className={styles.column1}>
                <Image
                  className="inputimage"
                  src={imageUrl}
                  alt="Imagen de evento"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <UploadButton
              className={styles.uploadButton}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setImageUrl(res[0].url)}
              onUploadError={(error: Error) =>
                console.error(`Error al subir la imagen: ${error.message}`)
              }
            />
            <div className={styles.column2}>
              {/* Fecha */}
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className={styles.inputdate}
                required
              />
              {/* Hora de inicio */}
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.input}
                required
              />
              {/* Hora de fin */}
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.input}
                required
              />

              <input
                type="text"
                placeholder="Título del evento"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

              <select
                className={styles.input}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              >
                <option value="auditorio">Auditorio</option>
                <option value="maker">Maker</option>
                <option value="oculo">Óculo</option>
                <option value="sala_principal">Sala de exposiciones</option>
                <option value="sala_alterna">Sala alterna</option>
                <option value="sala_capacitaciones">
                  Sala de capacitaciones
                </option>
                <option value="vestibulo_piso1">Vestíbulo primer piso</option>
                <option value="vestíbulo_piso2">Vestíbulo segundo piso</option>
                <option value="vestíbulo_piso3">Vestíbulo tercer piso</option>
                <option value="vestíbulo_piso4">Vestíbulo cuarto piso</option>
                <option value="auditorio_aire">Auditorio al aire libre</option>
              </select>
            </div>
            <textarea
              placeholder="Descripción del evento"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit" className={styles.button}>
              {eventToEdit ? "Guardar Cambios" : "Guardar"}
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};
