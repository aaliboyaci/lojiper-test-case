"use client";

import React, { useContext } from "react";
import Home from "./home/page";
import Header from "./components/Header";

export default function App() {
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
