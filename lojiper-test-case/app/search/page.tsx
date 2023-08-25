import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import "../styles/SearchResults.css";

export default function SearchResults({ results }) {
  const { isLogin, userName } = useContext(MainContext);

  return (
    <>
      <header className="header">
        <h1>Bus Ticket App</h1>
      </header>
      {isLogin ? (
        <h1> Hoşgeldin, {userName}</h1>
      ) : (
        <Link href="/login">
          <button>Giriş Yap</button>
        </Link>
      )}
      <main className="main">
        <div className="resultsContainer">
          <h2>Arama Sonuçları</h2>
          {results.length > 0 ? (
            <ul className="resultsList">
              {results.map((result) => (
                <li key={result.id} className="resultItem">
                  <p>
                    {result.departureCity} - {result.arrivalCity}
                  </p>
                  <p>Tarih: {result.date}</p>
                  <p>Boş Koltuk Sayısı: {result.availableSeats}</p>
                  <p>Fiyat: {result.price} TL</p>
                  <Link href={`/buy/${result.id}`}>
                    <a>Bilet Satın Al</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Uygun sefer bulunamadı.</p>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
      </footer>
    </>
  );
}
