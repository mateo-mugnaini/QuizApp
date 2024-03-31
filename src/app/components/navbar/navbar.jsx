"use client";
import { useTheme } from "../ThemeContext";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import s from "./navbar.module.css";

import { IoMoonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const pathName = usePathname();

  if (pathName === "/") {
    return (
      <div className={s.NavbarLanding}>
        {!isDarkMode ? (
          <IoMoonOutline className={s.ImgThemes} onClick={toggleDarkMode} />
        ) : (
          <GoSun className={s.ImgThemes} onClick={toggleDarkMode} />
        )}
      </div>
    );
  }

  if (pathName === "/Quiz") {
    return (
      <div className={s.ContenedorGeneral}>
        <Link className={s.BtnOut} href="/">
          Volver al Inicio
        </Link>
        <Link className={s.Btn} href="/leaderboard">
          Leaderboard
        </Link>
        <div className={s.ContenedorModoDark}>
          {!isDarkMode ? (
            <IoMoonOutline className={s.ImgResto} onClick={toggleDarkMode} />
          ) : (
            <GoSun className={s.ImgResto} onClick={toggleDarkMode} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={s.ContenedorGeneral}>
      <Link className={s.BtnOut} href="/">
        Volver al Inicio
      </Link>
      <Link className={s.Btn} href="/Quiz">
        Ir al Quiz
      </Link>{" "}
      <Link className={s.Btn} href="/leaderboard">
        Leaderboard
      </Link>
      <div className={s.ImgResto}>
        {!isDarkMode ? (
          <IoMoonOutline className={s.ImgResto} onClick={toggleDarkMode} />
        ) : (
          <GoSun className={s.ImgResto} onClick={toggleDarkMode} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
