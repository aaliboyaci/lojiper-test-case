"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import { fetchTravelData } from "@/data-access/fetchTravelData";
import { TravelData } from "../Interfaces/uiRelatedTypes";

const SearchResultsPage = () => {
  const { isLogin, userName, userSearchQuery } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);

  useEffect(() => {
    fetchTravelData(userSearchQuery)
      .then((results) => {
        setSearchResults(results || null);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, []);

  const renderHeader = () => (
    <header className="header">
      <h1>Bus Ticket App</h1>
      <Link href="/">
        <button>Anasayfa</button>
      </Link>
    </header>
  );

  const renderWelcomeMessage = () => (
    <h1>
      {isLogin ? (
        `Hoşgeldin, ${userName}`
      ) : (
        <Link href="/login">
          <button>Giriş Yap</button>
        </Link>
      )}
    </h1>
  );

  const renderResults = () => (
    <div className="resultsContainer">
      <h2>Arama Sonuçları</h2>
      <h3>Şunun için arama yaptınız:</h3>
      <p>{`${userSearchQuery.departCity}'dan, ${userSearchQuery.arrivalCity}'a, ${userSearchQuery.inputDate} tarihinde uygun seferler`}</p>
      <hr></hr>
      {searchResults ? (
        <div className="searchResult">
          <p>sefer no: {searchResults.id}</p>
          <p>sefer tarihi: {searchResults.date}</p>
          <p>
            rota: {searchResults.departCity} &gt; {searchResults.arrivalCity}
          </p>
          <p>bilet fiyatı: {searchResults.price} ₺</p>
          <p>boş koltuk sayısı: {searchResults.availableSeats}</p>
        </div>
      ) : null}
    </div>
  );

  const renderFooter = () => (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
    </footer>
  );

  return (
    <>
      {renderHeader()}
      {renderWelcomeMessage()}
      <main className="main">{renderResults()}</main>
      {renderFooter()}
    </>
  );
};

export default SearchResultsPage;
