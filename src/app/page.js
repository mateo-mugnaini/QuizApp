import Image from "next/image";
import styles from "./page.module.css";
import Logo from "../../public/Logo.png";
import Logo2 from "../../public/Logo.webp";

export default function Home() {
  return (
    <div className={styles.ContenedorGeneral}>
      <div className={styles.ContenedorTitulo}>
        <h1 className={styles.Titulo}>Bienvenido a Quiz APP</h1>
        <p className={styles.Mensaje}>
          Mejora tus conocimientos con nuestros cuestionarios interactivos.
        </p>
      </div>
      <div className={styles.ContenedorImagen}>
        <Image
          className={styles.ImageLogo}
          src={Logo2}
          alt="Imagen de bienvenida"
          width={800}
          height={300}
        />
      </div>
      <a href="/Quiz" className={styles.button}>
        Comienza con las preguntas
      </a>
    </div>
  );
}
