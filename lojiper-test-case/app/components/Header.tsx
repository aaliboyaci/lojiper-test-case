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
        <div className="logo">
          <Link href="/">Bus Ticket App</Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">Ana Sayfa</Link>
            </li>
            <li>
              {isLogin ? (
                <span>Hoşgeldin, {userName}</span>
              ) : (
                <Link href="/login">Giriş Yap</Link>
              )}
            </li>
            <li>
              <Link href="/cart">
                Sepet{" "}
                {/* {cartItems.length > 0 && (
                  <span className="cart-item-count">{cartItems.length}</span>
                )} */}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
