import React from "react";
import s from "./pogressBar.module.css";

const ProgressBar = ({ progress }) => {
  const percentage = (progress / 20) * 100; // Calcular el porcentaje de progreso

  return (
    <div className={s.ContenedorGeneral}>
      <div className={s.Counter}>Pregunta {`${progress} de 20`}</div>{" "}
      <div className={s.ProgressBar}>
        <div className={s.Progress} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
