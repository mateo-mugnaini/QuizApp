import React from "react";
import s from "./modal.module.css";

const Modal = ({ children }) => {
  return (
    <div className={s.ModalOverlay}>
      <div className={s.ModalContent}>
        {children}
        <a className={s.CloseButton} href="/Quiz">
          Cerrar
        </a>
      </div>
    </div>
  );
};

export default Modal;
