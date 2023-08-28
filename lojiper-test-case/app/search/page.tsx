"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { TravelData } from "../Interfaces/uiRelatedTypes";
import Header from "../components/Header";
import "../styles/Home.css";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import Loading from "../components/Loading";

const SearchResultsPage = () => {
  const { isLogin, userName, userSearchQuery } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [seatInfo, setSeatInfo] = useState<number | null>(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoadingSearch(true);

    fetchTravelData(userSearchQuery)
      .then((results) => setSearchResults(results || null))
      .catch((error) => setError("Bir Hata oluştu, lütfen tekrar deneyiniz"));
  }, []);

  useEffect(() => {
    fetchBusSeatData(Number(searchResults?.id))
      .then((results) => {
        const nullCount = results?.filter(
          (seat: BusSeatData) => seat.passengerGender === "null"
        ).length;
        setSeatInfo(nullCount);
        setIsLoadingSearch(false);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
        setIsLoadingSearch(false);
      });
  }, [searchResults]);

  const renderResults = () => (
    <div className="resultsContainer">
      <h2>Arama Sonuçları</h2>
      <h3>Şunun için arama yaptınız:</h3>
      <p>
        {`${userSearchQuery.departCity}'dan, ${userSearchQuery.arrivalCity}'a, ${userSearchQuery.inputDate} tarihinde uygun seferler`}
      </p>
      <hr />

      {searchResults ? (
        <div className="searchResult">
          <p>Sefer No: {searchResults.id}</p>
          <p>Sefer Tarihi: {searchResults.date}</p>
          <p>
            Rota: {searchResults.departCity} &gt; {searchResults.arrivalCity}
          </p>
          <p>Bilet Fiyatı: {searchResults.price} ₺</p>
          <p>Boş Koltuk Sayısı: {seatInfo}</p>
          <p>
            {isLogin ? (
              <Link
                href={`/ticket?id=${searchResults.id}&depart=${searchResults.departCity}&arrival=${searchResults.arrivalCity}`}
              >
                Boş koltukları görüntüle
              </Link>
            ) : (
              <>
                <p>Boş koltukları görüntülemek için lütfen giriş yapın </p>
                <Link href="/login">
                  <button>Giriş Yap</button>
                </Link>
              </>
            )}
          </p>
        </div>
      ) : isLoadingSearch ? (
        <div className="main">
          <Loading />
        </div>
      ) : (
        <>
          <h2>Uygun Sefer Bulunumadı</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );

  const renderFooter = () => (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
    </footer>
  );

  return (
    <div className="main">
      <Header />
      <main>{renderResults()}</main>
      {renderFooter()}
    </div>
  );
};

export default SearchResultsPage;
