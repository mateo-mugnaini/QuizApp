import React from "react";
import s from "./footer.module.css";
import Image from "next/image";

import logo from "../../../../public/Logo.png";

const Footer = () => {
  return (
    <div className={s.ContenedorGeneral}>
      <Image
        className={s.Logo}
        src={logo}
        alt=""
        width={100 * 1.5}
        height={100 * 1.5}
      />
      <h2 className={s.yo}>Created by Mateo Mugnaini</h2>
      <h4>V. 1.0.1</h4>
    </div>
  );
};

export default Footer;
