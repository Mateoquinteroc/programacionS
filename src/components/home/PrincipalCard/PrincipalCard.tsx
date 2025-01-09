import styles from './PrincipalCard.module.sass';
import React, { useContext } from "react";
import { CardSelectContext } from "app/components/home/Context/Context";

export const PrincipalCard = () => {
  const Context = useContext(CardSelectContext);

  // Función para extraer el número de la fecha
  const extractNumber = (date: string | undefined): string => {
    if (!date) return ""; 
    const match = date.match(/\d+/); 
    return match ? match[0] : ""; 
  };

  // Extraer el número de la primera y última fecha
  const firstEventDate = extractNumber(Context?.firstEvent?.date);
  const lastEventDate = extractNumber(Context?.lastEvent?.date);

  // Función para obtener el año actual
  const getCurrentYear = (): number => {
    return new Date().getFullYear(); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <h1 className={styles.title}>Esta semana en el</h1>
      <h2 className={styles.subtitle}>Centro Cultural</h2>

      <p className={styles.description}>
        Conoce la programación <br /> que tenemos para ti
      </p>

      <div className={styles.dateContainer}>
        {/* Mostrar las fechas utilizando los valores del contexto */}
        <p className={styles.dateLarge}>{`del ${firstEventDate} al ${lastEventDate}`}</p>
        <p className={styles.dateSmall}>{`de ${Context?.lastEvent?.month || "mes no disponible"}`}</p>
        <p className={styles.year}>{getCurrentYear()}</p>
      </div>
    </div>
  );
};
