"use client";
import React, { useState } from "react";
import s from "./page.module.css";
import Link from "next/link";

const Quiz = () => {
  const [filtroDificultad, setFiltroDificultad] = useState(null);

  return (
    <div className={s.ContenedorGeneral}>
      <h1>Que tipo de preguntas quieres responder</h1>
      <div className={s.ContenedorOpciones}>
        {filtroDificultad === null ? (
          <>
            <h2
              id="Categoria"
              className={s.Opcion}
              onClick={() => setFiltroDificultad("Categoria")}
            >
              Categoria
            </h2>
            <h2
              id="Dificultad"
              className={s.Opcion}
              onClick={() => setFiltroDificultad("Dificultad")}
            >
              Dificultad
            </h2>
          </>
        ) : filtroDificultad === "Dificultad" ? (
          <div className={s.ContenedorOpciones}>
            <Link className={s.Opcion2} href="/Quiz/facil">
              <h2>Dificultad Facil</h2>
            </Link>
            <Link className={s.Opcion2} href="/Quiz/medio">
              <h2>Dificultad Media</h2>
            </Link>
            <Link className={s.Opcion2} href="/Quiz/dificil">
              <h2>Dificultad Alta</h2>
            </Link>
            <h2
              className={s.BotonAtras}
              onClick={() => setFiltroDificultad(null)}
            >
              Atras
            </h2>
          </div>
        ) : filtroDificultad === "Categoria" ? (
          <div className={s.ContenedorOpciones}>
            <Link className={s.Opcion2} href="/Quiz/deporte">
              <h2>Deportes</h2>
            </Link>
            <Link className={s.Opcion2} href="/Quiz/historia">
              <h2>Historia</h2>
            </Link>
            <Link className={s.Opcion2} href="/Quiz/CGA">
              <h2>Cultura General Argentina</h2>
            </Link>
            <Link className={s.Opcion2} href="/Quiz/geografia">
              <h2>Geografia</h2>
            </Link>
            <h2
              className={s.BotonAtras}
              onClick={() => setFiltroDificultad(null)}
            >
              Atras
            </h2>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;
