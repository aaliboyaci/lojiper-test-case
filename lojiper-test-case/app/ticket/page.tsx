"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BusSeatData,
  busSeatData,
} from "../api/travelData/busSeatData/busSeatData";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import "./ticketStyle.css";
import Link from "next/link";
import Loading from "../components/Loading";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { MainContext } from "../Context/mainProvider";
import { TravelData } from "../Interfaces/uiRelatedTypes";
import handleSeatClick from "./components/handeSeatClick";
import "../styles/Home.css";
import Header from "../components/Header";

const SeatSelectionPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const departCity = searchParams.get("depart");
  const arrivalCity = searchParams.get("arrival");
  const { userGender } = useContext(MainContext);
  const { userSearchQuery, userName, setTotalPrice } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [newSeatData, setNewSeatData] = useState<BusSeatData | undefined>(
    undefined
  );

  useEffect(() => {
    setSelectedSeats([]);
    fetchBusSeatData(Number(id))
      .then((results) => {
        console.log(results);
        setNewSeatData(results || undefined);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchTravelData(userSearchQuery)
      .then((results) => {
        setSearchResults(results || null);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, []);

  if (!newSeatData) {
    return (
      <div className="main">
        <Loading />
      </div>
    );
  }

  const seatData = newSeatData;
  const numRows = 5;
  const numCols = 4;
  const busLayout: (string | null)[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(null)
  );
  seatData.forEach(
    (seat: {
      row: number;
      col: number;
      isOccupied: boolean;
      passengerGender: string;
    }) => {
      const { row, col, isOccupied, passengerGender } = seat;
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        busLayout[row][col] = isOccupied ? passengerGender : null;
      }
    }
  );

  const handleSeatClickWrapper = (row: number, col: number) => {
    handleSeatClick(
      row,
      col,
      busLayout,
      userGender,
      selectedSeats,
      setSelectedSeats
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = searchResults?.price;
    console.log(`seçilen koltuk sayısı=`);
    console.log(selectedSeats.length);
    return basePrice ? basePrice * selectedSeats.length : null;
  };

  return (
    <div className="main">
      <div className="seat-selection-page">
        <Header />
        <h1>Sefer Detayları ve Fiyat</h1>
        <p>
          Merhaba {userName}
          {userGender === "male" ? <p>{"(e)"}</p> : <p>{"(k)"}</p>}
        </p>
        <ToastContainer />
        <h2>
          {departCity} - {arrivalCity} Seferi
        </h2>
        <div className="bus-layout">
          {busLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="bus-row">
              {row.map((passenger, colIndex) => (
                <div
                  key={colIndex}
                  className={`bus-seat ${
                    selectedSeats.includes(`${rowIndex}${colIndex}`)
                      ? "selected"
                      : passenger === "male"
                      ? "occupied-male"
                      : passenger === "female"
                      ? "occupied-female"
                      : ""
                  } ${colIndex === 1 ? "gapBetween" : ""}`}
                  onClick={() => handleSeatClickWrapper(rowIndex, colIndex)}
                >
                  {selectedSeats.includes(`${rowIndex}${colIndex}`)
                    ? "X"
                    : passenger
                    ? passenger === "male"
                      ? "E"
                      : "K"
                    : `${rowIndex * numCols + colIndex + 1}`}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="total-price">
          Toplam Ücret: {calculateTotalPrice()} TL
        </div>
        <button
          className="continue-button"
          onClick={() => {
            if (selectedSeats.length === 0) {
              toast.warn("Koltuk seçmediniz");
            } else {
              setTotalPrice(
                searchResults?.price
                  ? searchResults.price * selectedSeats.length
                  : 0
              );
              setSelectedSeats([]);
              router.push("/payment");
            }
          }}
        >
          Ödeme
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SeatSelectionPage;
