"use client";

import React, { useContext } from "react";
import Home from "./home/page";
import Link from "next/link";
import { MainContext } from "./Context/mainProvider";
import Header from "./components/Header";

export default function App() {
  const { isLogin, setIsLogin } = useContext(MainContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container">
        <Home />
      </main>
    </>
  );
}
