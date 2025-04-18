import styles from './PrincipalCard.module.sass';
import React from "react";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

export const PrincipalCard = ({ from, to }: { from: Date; to: Date }) => {
  const areDifferentMonths = (from: Date, to: Date): boolean => {
    return from.getMonth() !== to.getMonth() || from.getFullYear() !== to.getFullYear();
  };

  const monthText = areDifferentMonths(from, to)
    ? `${format(from, 'LLLL', { locale: es }).toUpperCase()} - ${format(to, 'LLLL', { locale: es }).toUpperCase()}`
    : format(from, 'LLLL', { locale: es }).toUpperCase();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Esta semana en el</h1>
      <h2 className={styles.subtitle}>Centro Cultural</h2>

      <div className={styles.dateContainer}>
        <div className={styles.dateInner}>
          <p className={styles.dateRange}>{`${from.getDate()} al ${to.getDate()}`}</p>
          <p className={styles.month}>{monthText}</p>
        </div>
      </div>

      <div className={styles.header}></div>
    </div>
  );
};
