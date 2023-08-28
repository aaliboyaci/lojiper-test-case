"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

const SeatSelectionPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const departCity = searchParams.get("depart");
  const arrivalCity = searchParams.get("arrival");
  const { userGender } = useContext(MainContext);

  const { userSearchQuery, userName } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [newSeatData, setNewSeatData] = useState<BusSeatData | undefined>(
    undefined
  );

  useEffect(() => {
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
    return <Loading />;
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

  const handleSeatClick = (row: number, col: number) => {
    const seat = `${row}${col}`;

    console.log(userGender);
    if (
      (busLayout[row][col] === "male" || busLayout[row][col] === "female") &&
      !selectedSeats.includes(seat)
    ) {
      return;
    }
    //karşı cinsler logic
    if (
      busLayout[row][0] === "male" &&
      seat.charAt(1) === "1" &&
      userGender === "female"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }
    if (
      busLayout[row][0] === "female" &&
      seat.charAt(1) === "1" &&
      userGender === "male"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }

    if (
      busLayout[row][1] === "male" &&
      seat.charAt(1) === "0" &&
      userGender === "female"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }
    if (
      busLayout[row][1] === "female" &&
      seat.charAt(1) === "0" &&
      userGender === "male"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }
    //otobüs sağ tarafı logic
    if (
      busLayout[row][2] === "male" &&
      seat.charAt(1) === "3" &&
      userGender === "female"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }
    if (
      busLayout[row][2] === "female" &&
      seat.charAt(1) === "3" &&
      userGender === "male"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }

    if (
      busLayout[row][3] === "male" &&
      seat.charAt(1) === "2" &&
      userGender === "female"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }
    if (
      busLayout[row][3] === "female" &&
      seat.charAt(1) === "2" &&
      userGender === "male"
    ) {
      toast.error("Karşı cinsler yanyana koltuk alamaz");
      return;
    }

    ////////
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seat)) {
      toast.error("En fazla 5 koltuk seçebilirsiniz!");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = searchResults?.price;
    return basePrice ? basePrice * selectedSeats.length : null;
  };

  return (
    <div className="seat-selection-page">
      <h1>Sefer Detayları ve Fiyat</h1>
      <Link href="/">Anasayfa</Link>
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
                onClick={() => handleSeatClick(rowIndex, colIndex)}
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
      <Link href="/payment">
        <button className="continue-button">Devam Et</button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default SeatSelectionPage;
