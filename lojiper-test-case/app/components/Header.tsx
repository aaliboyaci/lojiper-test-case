import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import "./Header.css";

const Header = () => {
  const { isLogin, userName } = useContext(MainContext); //cartItems ekle

  return (
    <header className="header">
      <div className="header-container">
        <div className="title-app">
          <Link className="title-app" href="/">
            <h1>Bus Ticket App</h1>
          </Link>
        </div>
        <div className="nav">
          {isLogin ? (
            <span>Hoşgeldin, {userName}</span>
          ) : (
            <>
              <Link href="/login">Giriş Yap</Link>
              <Link href="/register">Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
