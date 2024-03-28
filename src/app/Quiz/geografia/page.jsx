"use client";
import React, { useState, useEffect } from "react";
import s from "../styles/page.module.css";
import Points from "../components/Points/points";
import ProgressBar from "../components/PogressBar/pogressBar";
import Modal from "../components/FinalMessage/Modal";
import FinalMessage from "../components/FinalMessage/finalMessage";
import PreguntasPage from "../components/PreguntaPage/PreguntaPage";

const PreguntasDeportes = () => {
  const [points, setPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [buttonColors, setButtonColors] = useState({});
  const [disableButtons, setDisableButtons] = useState(false);

  const handleOptionSelect = (selected, currentQuestion) => {
    const isCorrect = selected === currentQuestion.opciones.correcta;
    setPoints(isCorrect ? points + 0.5 : points);

    const newButtonColors = {
      ...Object.fromEntries(
        Object.keys(currentQuestion.opciones).map((key) => [
          key,
          key === selected
            ? isCorrect
              ? s.BtnRespuestaCorrecta
              : s.BtnRespuestaIncorrecta
            : s.BtnRespuesta,
        ])
      ),
    };
    setButtonColors(newButtonColors);
    setDisableButtons(true);

    setTimeout(() => {
      getRandomQuestion();
      setButtonColors({});
    }, 1500);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  if (showModal) {
    return (
      <Modal onClose={() => setShowModal(false)}>
        <FinalMessage points={points} />
      </Modal>
    );
  }

  return (
    <div className={s.ContenedorGeneral}>
      <div>
        <PreguntasPage
          tema="Geografia"
          handleOptionSelect={handleOptionSelect}
          buttonColors={buttonColors}
          disableButtons={disableButtons}
        />
      </div>
    </div>
  );
};

export default PreguntasDeportes;
