"use client";

import React, { useContext } from "react";
import Home from "./home/page";
import Link from "next/link";
import { MainContext } from "./Context/mainProvider";

export default function App() {
  const { isLogin, setIsLogin, userInfo } = useContext(MainContext);
  console.log(userInfo);

  return (
    <>
      <header>
        <Link href="/">Anasayfa</Link>
        {isLogin ? <p onClick={() => setIsLogin(false)}>çıkış yap</p> : <></>}
      </header>
      <main className="container">
        <Home />
      </main>
    </>
  );
}
