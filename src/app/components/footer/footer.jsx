"use client";
import React from "react";
import s from "./footer.module.css";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();

  if (pathName === "/Quiz" || pathName === "/Leaderboard") {
    return (
      <div className={s.ContenedorGeneral}>
        <h3 className={s.yo2}>Created by Mateo Mugnaini</h3>
        <h4>v. 1.1.0</h4>
      </div>
    );
  }
  if (pathName === "/") {
    return (
      <div className={s.ContenedorGeneral}>
        <h4>v. 1.1.0</h4>
        <a className={s.yo}>Created by Mateo Mugnaini</a>
      </div>
    );
  }
};

export default Footer;
