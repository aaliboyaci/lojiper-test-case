"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { TravelData } from "../../src/Interfaces/uiRelatedTypes";
import Header from "../../src/components/Header";
import "../../src/styles/MainStyles.css";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import Loading from "../../src/components/Loading";
import { ToastContainer } from "react-toastify";

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

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4"></div>
          <div className="col-md-4">
            <ToastContainer />
            <div className="row justify-content-center p-0 border rounded-3">
              <main className="col-md p-4 border form-container">
                <h2>Arama Sonuçları</h2>
                <h5>Şunun için arama yaptınız:</h5>
                <p>
                  {`${userSearchQuery.departCity}'dan, ${userSearchQuery.arrivalCity}'a, ${userSearchQuery.inputDate} tarihinde uygun seferler`}
                </p>
                <hr className="my-4" />

                {searchResults ? (
                  <div className="searchResult">
                    <p>Sefer No: {searchResults.id}</p>
                    <p>Sefer Tarihi: {searchResults.date}</p>
                    <p>
                      Rota: {searchResults.departCity} &gt;{" "}
                      {searchResults.arrivalCity}
                    </p>
                    <p>Bilet Fiyatı: {searchResults.price} ₺</p>
                    <p>Boş Koltuk Sayısı: {seatInfo}</p>
                    <>
                      {isLogin ? (
                        <Link
                          href={`/ticket?id=${searchResults.id}&depart=${searchResults.departCity}&arrival=${searchResults.arrivalCity}`}
                          style={{ color: "green" }}
                        >
                          <button type="button" className="btn btn-success">
                            Boş Koltukları Görüntüle
                          </button>
                        </Link>
                      ) : (
                        <>
                          <p>
                            Boş koltukları görüntülemek için lütfen giriş yapın{" "}
                          </p>
                          <Link href="/login">
                            <button>Giriş Yap</button>
                          </Link>
                        </>
                      )}
                    </>
                  </div>
                ) : isLoadingSearch ? (
                  <div className="main">
                    <Loading />
                  </div>
                ) : (
                  <>
                    <h2>Uygun Sefer Bulunamadı</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </>
                )}
              </main>
            </div>
          </div>

          <div className="col-4"></div>
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;
