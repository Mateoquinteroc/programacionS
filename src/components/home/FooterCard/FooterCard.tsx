import React from 'react';
import Image from 'next/image';
import styles from './FooterCard.module.sass';

export const FooterCard = () => {

  return (
    <div className={styles.contenedor}>
      {/* <button
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
      </button> */}
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
