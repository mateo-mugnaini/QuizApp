import React from "react";

const FinalMessage = ({ points }) => {
  return (
    <div>
      <h1>El Quiz ya a Finalizado</h1>
      <h2>Tus puntos fueron {points}/10 </h2>
    </div>
  );
};

export default FinalMessage;
