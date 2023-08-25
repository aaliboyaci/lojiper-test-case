"use client";
import React, { useContext, useState } from "react";
import "../styles/Home.css";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";

const Home = () => {
  const { isLogin, userName } = useContext(MainContext);
  const [departCity, setDepartCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [inputDate, setInputDate] = useState("");

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(
      "kalkış" + departCity + " varış" + arrivalCity + " tarih" + inputDate
    );
  };

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

  const renderDepartureOptions = () => {
    return (
      <select
        id="departure"
        name="departure"
        value={departCity}
        onChange={(e) => setDepartCity(e.target.value)}
      >
        <option value="">Seç</option>
        <option value="İstanbul">İstanbul</option>
        <option value="Ankara">Ankara</option>
      </select>
    );
  };

  const renderArrivalOptions = () => {
    return (
      <select
        id="arrival"
        name="arrival"
        value={arrivalCity}
        onChange={(e) => setArrivalCity(e.target.value)}
      >
        <option value="">Seç</option>
        <option value="İzmir">İzmir</option>
        <option value="Antalya">Antalya</option>
      </select>
    );
  };

  return (
    <>
      <header className="header">
        <h1>Bus Ticket App</h1>
      </header>
      {renderLoginButton()}
      <main className="main">
        <div className="formContainer">
          <h2>Seferleri Ara</h2>
          <form className="searchForm" onSubmit={handleSearchSubmit}>
            <label htmlFor="departure">Kalkış</label>
            {renderDepartureOptions()}

            <label htmlFor="arrival">Varış</label>
            {renderArrivalOptions()}

            <label htmlFor="date">Tarih</label>
            <input
              type="date"
              id="date"
              name="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />

            <button type="submit">Ara</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
      </footer>
    </>
  );
};

export default Home;
