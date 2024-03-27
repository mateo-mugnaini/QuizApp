import React from "react";
import s from "./points.module.css";

const Points = ({ points }) => {
  // Recibir los puntos como prop
  return (
    <div className={s.ContenedorGeneral}>
      <h1>Puntos: {points}</h1> {/* Mostrar los puntos */}
    </div>
  );
};

export default Points;
