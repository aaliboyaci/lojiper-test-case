"use client";
import React, { useContext, useState } from "react";
import "../../src/styles/MainStyles.css";
import { MainContext } from "../Context/mainProvider";
import { showToastFail } from "../../src/components/registerComponents/ShowToast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../../src/components/Loading";
import Header from "../../src/components/Header";

const Home = () => {
  const { setUserSearchQuery } = useContext(MainContext);
  const router = useRouter();
  const [departCity, setDepartCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (departCity === "" || arrivalCity === "" || inputDate === "") {
      showToastFail("Eksik Bilgi Girdiniz");
    } else {
      const userNewSearch = {
        departCity: departCity,
        arrivalCity: arrivalCity,
        inputDate: inputDate,
      };
      setUserSearchQuery(userNewSearch);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.clear();
        router.push("/search");
      }, 600);
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
      <ToastContainer />
      <Header />
      <div className="row justify-content-center p-0" style={{ width: "auto" }}>
        <main className="col-md p-4 border formContainer">
          <h2>Seferleri Ara</h2>
          <form className="searchForm" onSubmit={handleSearchSubmit}>
            <div className="form-group">
              <label htmlFor="departure">Kalkış</label>
              {renderDepartureOptions()}
            </div>

            <div className="form-group">
              <label htmlFor="arrival">Varış</label>
              {renderArrivalOptions()}
            </div>

            <div className="form-group">
              <label htmlFor="date">Tarih</label>
              <input
                className="form-control"
                type="date"
                id="date"
                name="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Ara
              </button>
              {isLoading && <Loading />}
            </div>
          </form>
        </main>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
      </footer>
    </>
  );
};

export default Home;
