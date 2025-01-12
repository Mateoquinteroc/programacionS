import React, { useContext } from 'react';
import Image from 'next/image';
import { CardSelectContext } from "../Context/Context";
import { ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/solid';
import styles from './FooterCard.module.sass';

export const FooterCard = () => {
  const Context = useContext(CardSelectContext);

  return (
    <div className={styles.contenedor}>
      <button
        className={styles.botonUbicacion}
        onClick={() => {
          Context?.openCardBaseDetails();
        }}
      >
        <MapPinIcon className={styles.icono} />
      </button>
      <button
        className={styles.botonChat}
        onClick={() => {
          Context?.openQr();
        }}
      >
        <ChatBubbleLeftRightIcon className={styles.icono} />
      </button>
      <figure className={styles.figura}>
        <Image
          className={styles.imagenEvento}
          src={"/images/logos.png"}
          alt={"logos"}
          width={1048}
          height={109}
        />
      </figure>
    </div>
  );
};
