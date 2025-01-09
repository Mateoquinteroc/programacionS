import Image from 'next/image';
import styles from './Fondo.module.sass';

export const Fondo = () => {
  return (
    <div className={styles.fondoContainer}>
      <Image 
        src="/images/fondo.jpg"
        fill // Hace que la imagen ocupe todo el contenedor
        style={{ objectFit: 'cover' }} // Ajusta cómo se muestra la imagen
        alt="fondo"
      />
    </div>
  );
};
