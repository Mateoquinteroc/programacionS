"use client";

import { AuthButton } from "../home/Loguin/botonlogin";
import styles from "./PanelAdmin.module.sass";

export default function PanelAdminClient({
  setNextWeek,
  setPrevWeek,
}: {
  setNextWeek: () => void;
  setPrevWeek: () => void;
}) {
  return (
    <div>
      <div className={styles.buttonContainer}>
        <button onClick={setPrevWeek} className={styles.buttonPrevious}>
          Semana Anterior
        </button>
        <button onClick={setNextWeek} className={styles.buttonNext}>
          Próxima Semana
        </button>
      </div>
        <AuthButton />
    </div>
  );
}
