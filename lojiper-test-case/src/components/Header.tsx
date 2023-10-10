import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../../app/Context/mainProvider";
import "./Header.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLogin, userName, setIsLogin, setUserName, setUserGender } =
    useContext(MainContext);
  const router = useRouter();

  const handleLogOut = () => {
    setIsLogin(false);
    setUserGender("");
    setUserName("");
    router.push("/");
  };

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
            <>
              <span>Hoşgeldin, {userName} </span>
              <button onClick={handleLogOut}> Çıkış Yap</button>
            </>
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
