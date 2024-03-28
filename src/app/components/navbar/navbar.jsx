"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import s from "./navbar.module.css";

const Navbar = () => {
  const pathName = usePathname();

  if (pathName === "/") {
    return null; // No renderizar nada si pathName es "/"
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
      </div>
    ); // No renderizar nada si pathName es "/"
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
    </div>
  );
};

export default Navbar;
