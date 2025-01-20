"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MenuOptions.module.sass";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export const MenuOptions = ({
  onEdit,
  onDelete,
  onCopy,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle del menú
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      {/* Icono de tres puntos */}
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="menuPanel"
      >
        <EllipsisVerticalIcon className={styles.menuIcon} />
      </button>

      {/* Panel de opciones */}
      {isOpen && (
        <div
          id="menuPanel"
          className={styles.menuPanel}
          role="menu"
          aria-labelledby="menuButton"
        >
          <button
            className={styles.menuOption}
            onClick={() => {
              setIsOpen(false); // Cerrar menú
              onEdit(); // Ejecutar la acción de editar
            }}
          >
            Editar
          </button>
          <button
            className={styles.menuOption}
            onClick={() => {
              setIsOpen(false); // Cerrar menú
              onDelete(); // Ejecutar la acción de eliminar
            }}
          >
            Eliminar
          </button>
          <button
            className={styles.menuOption}
            onClick={() => {
              setIsOpen(false); // Cerrar menú
              onCopy(); // Ejecutar la acción de copiar
            }}
          >
            Copiar al día siguiente
          </button>
        </div>
      )}
    </div>
  );
};
