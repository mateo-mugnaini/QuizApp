"use client";
import React, { useState, useEffect } from "react";
import Preguntas from "../../components/questions/Questions";
import s from "./page.module.css";
import Points from "../components/Points/points";
import ProgressBar from "../components/PogressBar/pogressBar";
import Modal from "../components/FinalMessage/Modal";
import FinalMessage from "../components/FinalMessage/finalMessage";

const PreguntasCGA = () => {
  const todasLasPreguntas = [].concat(...Object.values(Preguntas[0]));

  const filterByTheme = (theme) => {
    return todasLasPreguntas.filter((pregunta) =>
      pregunta.tematica.includes(theme)
    );
  };

  const preguntasCGA = filterByTheme("Cultura General Argentina");

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [buttonColors, setButtonColors] = useState({});
  const [disableButtons, setDisableButtons] = useState(false);

  const getRandomQuestion = () => {
    if (progress < 20) {
      let availableQuestions = preguntasCGA.filter(
        (question) => !usedQuestions.includes(question.numeroPregunta)
      );

      if (availableQuestions.length === 0) {
        setShowModal(true); // Si no hay más preguntas disponibles, muestra el modal final.
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];

      setCurrentQuestion(randomQuestion);
      setUsedQuestions((prevUsedQuestions) => [
        ...prevUsedQuestions,
        randomQuestion?.numeroPregunta,
      ]);
      setProgress(progress + 1);
      setDisableButtons(false);

      setTimeout(() => {
        setCurrentQuestion(randomQuestion);
        setButtonColors({});
      }, 600);
    } else {
      setShowModal(true);
    }
  };

  const handleOptionSelect = (selected) => {
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
      <div className={s.ContenedorBtns}>
        <a href="/Quiz">Volver a atrás</a>
        <a href="/">Volver al Home</a>
      </div>
      <Points points={points} />
      <ProgressBar progress={progress} />
      <div>
        <h3>{currentQuestion?.pregunta}</h3>
        <ul>
          {currentQuestion &&
            Object.keys(currentQuestion.opciones).map((opcionKey) => {
              if (opcionKey !== "correcta") {
                return (
                  <div className={s.ContenedorRespuestas} key={opcionKey}>
                    <h2
                      className={`${s.BtnRespuesta} ${buttonColors[opcionKey]}`}
                      onClick={
                        !disableButtons
                          ? () => handleOptionSelect(opcionKey)
                          : null
                      }
                    >
                      {currentQuestion.opciones[opcionKey]}
                    </h2>
                  </div>
                );
              }
              return null;
            })}
        </ul>
      </div>
    </div>
  );
};

export default PreguntasCGA;
