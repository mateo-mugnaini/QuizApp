"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useTheme } from "./components/ThemeContext";

import DarkModePC from "../../public/background/BackgroundPCDark.png";
import ModePC from "../../public/background/BackgroundPC.png";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Verificar el ancho de la ventana al cargar y al cambiar el tamaño
    handleResize();
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.ContenedorGeneral}>
      <div className={styles.ContenedorFondo}>
        {isMobile ? (
          isDarkMode ? (
            <Image
              className={styles.BackgroundCell}
              src="/background/BackgroundCellDark.png"
              alt=""
              width={1920}
              height={1080}
            />
          ) : (
            <Image
              className={styles.BackgroundCell}
              src="/background/BackgroundCell.png"
              alt=""
              width={1920}
              height={1080}
            />
          )
        ) : isDarkMode ? (
          <Image
            className={styles.BackgroundPC}
            src={DarkModePC}
            alt=""
            width={1920}
            height={1080}
          />
        ) : (
          <Image
            className={styles.BackgroundPC}
            src={ModePC}
            alt=""
            width={1920}
            height={1080}
          />
        )}
      </div>
      <div className={styles.ContenedorContenido}>
        <div className={styles.ContenedorTitulo}>
          <h1 className={styles.Titulo}>Quiz APP</h1>
          <p className={styles.Mensaje}>
            Mejora tus conocimientos con nuestros cuestionarios interactivos.
          </p>
        </div>
        <a href="/Quiz" className={styles.button}>
          Ir al Quiz
        </a>
      </div>
    </div>
  );
}
