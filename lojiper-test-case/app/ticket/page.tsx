"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import "../../src/styles/ticketStyle.css";
import Loading from "../../src/components/Loading";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { MainContext } from "../Context/mainProvider";
import { TravelData } from "../../src/Interfaces/uiRelatedTypes";
import handleSeatClick from "../../src/components/ticketComponents/handeSeatClick";
import "../../src/styles/MainStyles.css";
import Header from "../../src/components/Header";
import GenderModal from "@/src/components/ticketComponents/modalPopUp";
import TravelInfoPage from "../travel-info/page";

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
  const [seatRow, setSeatRow] = useState<number>(0);
  const [seatCol, setSeatCol] = useState<number>(0);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(0);
  console.log(selectedSeats);
  useEffect(() => {
    setSelectedSeats([]);
    fetchBusSeatData(Number(id))
      .then((results) => {
        setNewSeatData(results || undefined);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
      });
  }, [id]);

  useEffect(() => {
    fetchTravelData(userSearchQuery)
      .then((results) => {
        setSearchResults(results || null);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
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

  const openModal = () => {
    setIsModalOpen(1);
  };

  const closeModal = async () => {
    setIsModalOpen(2);
  };

  const handleGenderSubmit = async (newUserGender: string) => {
    await closeModal();
    handleSeatClickWrapper(seatRow, seatCol, newUserGender);
  };

  const handleSeatClickWrapper = (
    row: number,
    col: number,
    newUserGender: string
  ) => {
    handleSeatClick(
      row,
      col,
      busLayout,
      newUserGender,
      selectedSeats,
      setSelectedSeats
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = searchResults?.price;
    return basePrice ? basePrice * selectedSeats.length : null;
  };

  return (
    <div className="main">
      <div className="seat-selection-page">
        <Header />
        <h1>Koltuk Seçimi</h1>
        <p>
          Merhaba {userName}
          {userGender === "male" ? <>{"(e)"}</> : <>{"(k)"}</>}
        </p>
        <ToastContainer />
        {error && <p style={{ color: "red" }}>{error}</p>}
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
                    selectedSeats.includes(`${rowIndex}${colIndex}female`) ||
                    selectedSeats.includes(`${rowIndex}${colIndex}male`)
                      ? "selected"
                      : passenger === "male"
                      ? "occupied-male"
                      : passenger === "female"
                      ? "occupied-female"
                      : ""
                  } ${colIndex === 1 ? "gapBetween" : ""}`}
                  onClick={() => {
                    if (
                      selectedSeats.includes(`${rowIndex}${colIndex}female`) ||
                      selectedSeats.includes(`${rowIndex}${colIndex}male`)
                    ) {
                      setSelectedSeats((prevSelectedSeats) =>
                        prevSelectedSeats.filter(
                          (s) =>
                            s !== `${rowIndex}${colIndex}female` &&
                            s !== `${rowIndex}${colIndex}male`
                        )
                      );
                    } else {
                      openModal();
                      setSeatRow(rowIndex);
                      setSeatCol(colIndex);
                    }
                  }}
                >
                  {selectedSeats.includes(`${rowIndex}${colIndex}female`) ||
                  selectedSeats.includes(`${rowIndex}${colIndex}male`)
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
        <div></div>
        <br></br>
        <br></br>
        <TravelInfoPage selectedSeats={selectedSeats} />
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

      {isModalOpen === 1 && (
        <GenderModal
          onGenderSubmit={handleGenderSubmit}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default SeatSelectionPage;
