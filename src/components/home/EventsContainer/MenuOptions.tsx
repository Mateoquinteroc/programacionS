"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MenuOptions.module.sass";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export const MenuOptions = ({
  onEdit,
  onDelete,
  onCopyToNextDay,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onCopyToNextDay?: () => void;
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
              setIsOpen(false); 
              onEdit(); 
            }}
          >
            Editar
          </button>
          <button
            className={styles.menuOption}
            onClick={() => {
              setIsOpen(false); 
              onDelete(); 
            }}
          >
            Eliminar
          </button>
          {onCopyToNextDay && (
            <button
              className={styles.menuOption}
              onClick={() => {
                setIsOpen(false); 
                onCopyToNextDay(); 
              }}
            >
              Copiar a otro día
            </button>
          )}
        </div>
      )}
    </div>
  );
};
