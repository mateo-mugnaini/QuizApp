"use client";
import React, { useState, useEffect } from "react";
import Preguntas from "../../components/questions/Questions";
import s from "./page.module.css";
import Points from "../components/Points/points";
import ProgressBar from "../components/PogressBar/pogressBar";
import Modal from "../components/FinalMessage/Modal";
import FinalMessage from "../components/FinalMessage/finalMessage";

const PreguntasFaciles = () => {
  const todasLasPreguntas = [].concat(...Object.values(Preguntas[0]));

  const preguntasFacil = todasLasPreguntas.filter(
    (pregunta) => pregunta.dificultad === "Facil"
  );
  console.log(preguntasFacil);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [buttonColors, setButtonColors] = useState({}); // Estado para los colores de los botones
  const [disableButtons, setDisableButtons] = useState(false); // Estado para deshabilitar los botones

  const getRandomQuestion = () => {
    if (progress < 20) {
      let availableQuestions = preguntasFacil.filter(
        (question) => !usedQuestions.includes(question.id)
      );

      if (availableQuestions.length === 0) {
        availableQuestions = preguntasFacil;
        setUsedQuestions([]);
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];

      setCurrentQuestion(randomQuestion);
      setUsedQuestions([...usedQuestions, randomQuestion.id]);
      setProgress(progress + 1);
      setDisableButtons(false); // Habilitar los botones nuevamente al obtener una nueva pregunta

      // Retraso de un segundo antes de mostrar la siguiente pregunta
      setTimeout(() => {
        setCurrentQuestion(randomQuestion);
        // Restablecer el color de los botones a su estado original
        setButtonColors({});
      }, 600);
    } else {
      setShowModal(true);
    }
  };

  const handleOptionSelect = (selected) => {
    const isCorrect = selected === currentQuestion.opciones.correcta;
    setPoints(isCorrect ? points + 0.5 : points);

    // Actualizar el estado de los colores de los botones
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
    setDisableButtons(true); // Deshabilitar los botones después de seleccionar una opción

    // Retraso de un segundo antes de obtener una nueva pregunta
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
        <a href="/Quiz">Volver a atras</a>
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

export default PreguntasFaciles;
