import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import "./Header.css";

const Header = () => {
  const { isLogin, userName } = useContext(MainContext); //cartItems ekle

  const renderLoginButton = () => {
    if (isLogin) {
      return <h1> hoşgeldin {userName}</h1>;
    } else {
      return (
        <Link href="/login">
          <button>Giriş Yap</button>
        </Link>
      );
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="title-app">
          <Link href="/">Bus Ticket App</Link>
        </div>
        <div className="nav">
          {isLogin ? (
            <span>Hoşgeldin, {userName}</span>
          ) : (
            <Link href="/login">Giriş Yap</Link>
          )}

          <Link href="/cart">
            Sepet{" "}
            {/* {cartItems.length > 0 && (
                  <span className="cart-item-count">{cartItems.length}</span>
                )} */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
