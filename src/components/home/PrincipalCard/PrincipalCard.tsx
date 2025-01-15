import styles from './PrincipalCard.module.sass';
import React from "react";
import { es } from 'date-fns/locale'
import { format } from 'date-fns'

export const PrincipalCard = ({from, to}:{from:Date;to:Date}) => {

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
        <p className={styles.dateLarge}>{`del ${from.getDate()} al ${to.getDate()}`}</p>
        <p className={styles.dateSmall}>{`de ${format(from,'LLLL',{locale:es})}`}</p>
        <p className={styles.year}>{from.getFullYear()}</p>
      </div>
    </div>
  );
};
