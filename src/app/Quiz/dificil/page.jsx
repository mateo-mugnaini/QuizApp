"use client";
import React, { useState, useEffect } from "react";
import Preguntas from "../../components/questions/Questions";
import s from "./page.module.css";
import Points from "../components/Points/points";
import ProgressBar from "../components/PogressBar/pogressBar";
import Modal from "../components/FinalMessage/Modal";
import FinalMessage from "../components/FinalMessage/finalMessage";

const PreguntasDificiles = () => {
  const todasLasPreguntas = [].concat(...Object.values(Preguntas[0]));

  const preguntasDificil = todasLasPreguntas.filter(
    (pregunta) => pregunta.dificultad === "Dificil"
  );

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [buttonColors, setButtonColors] = useState({});
  const [disableButtons, setDisableButtons] = useState(false);

  const getRandomQuestion = () => {
    if (progress < 20) {
      let availableQuestions = preguntasDificil.filter(
        (question) => !usedQuestions.includes(question.id)
      );

      if (availableQuestions.length === 0) {
        availableQuestions = preguntasDificil;
        setUsedQuestions([]);
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];

      const shuffledOptions = shuffleOptions(randomQuestion.opciones);
      setCurrentQuestion({ ...randomQuestion, opciones: shuffledOptions });

      setUsedQuestions([...usedQuestions, randomQuestion.id]);
      setProgress(progress + 1);
      setDisableButtons(false);

      setTimeout(() => {
        console.log(
          "Opciones de respuesta seleccionadas:",
          currentQuestion.opciones
        );
        setCurrentQuestion({ ...randomQuestion, opciones: shuffledOptions });
        setButtonColors({});
      }, 600);
    } else {
      setShowModal(true);
    }
  };

  const shuffleOptions = (options) => {
    const keys = Object.keys(options);
    const shuffledKeys = shuffleArray(keys);
    const shuffledOptions = {};

    shuffledKeys.forEach((key) => {
      shuffledOptions[key] = options[key];
    });

    console.log("Opciones de respuesta original:", options);
    console.log("Opciones de respuesta aleatorias:", shuffledOptions);

    return shuffledOptions;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

export default PreguntasDificiles;
