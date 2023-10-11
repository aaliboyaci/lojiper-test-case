"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { MainContext } from "../Context/mainProvider";
import Header from "../../src/components/Header";
import GenderModal from "@/src/components/ticketComponents/modalPopUp";
import TravelInfoPage from "../../src/components/ticketComponents/TravelInfo";

import "../../src/styles/ticketStyle.css";
import "../../src/styles/MainStyles.css";

import Loading from "../../src/components/Loading";
import { TravelData } from "../../src/Interfaces/uiRelatedTypes";
import handleSeatClick from "../../src/components/ticketComponents/handeSeatClick";
import Footer from "@/src/components/Footer";

const SeatSelectionPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const departCity = searchParams.get("depart");
  const arrivalCity = searchParams.get("arrival");
  const { userSearchQuery, setTotalPrice } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [newSeatData, setNewSeatData] = useState<BusSeatData | undefined>(
    undefined
  );
  const [seatRow, setSeatRow] = useState<number>(0);
  const [seatCol, setSeatCol] = useState<number>(0);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(0);
  console.clear();
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
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4"></div>
          <div className="col-md-4">
            <ToastContainer />
            <div className="row justify-content-center p-0 border rounded-3 text-center">
              <main className="col-md p-4 border form-container">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <h2 className="my-3">
                  {departCity} - {arrivalCity} Seferi
                </h2>
                <div className="bus-layout">
                  {busLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="bus-row">
                      {row.map((passenger, colIndex) => (
                        <div
                          key={colIndex}
                          className={`bus-seat ${
                            selectedSeats.includes(
                              `${rowIndex}${colIndex}female`
                            ) ||
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
                              selectedSeats.includes(
                                `${rowIndex}${colIndex}female`
                              ) ||
                              selectedSeats.includes(
                                `${rowIndex}${colIndex}male`
                              )
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
                          {selectedSeats.includes(
                            `${rowIndex}${colIndex}female`
                          ) ||
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
                <p>
                  <small className="opacity-25">
                    Seçili koltuklardan vazgeçmek için tekrar üstüne
                    tıklayabilirsiniz
                  </small>
                </p>
                <TravelInfoPage selectedSeats={selectedSeats} />
                <div className="total-price">
                  Toplam Ücret: {calculateTotalPrice()} TL
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    const isVerifyingDone = document.querySelectorAll(
                      ".ticket-info-disabled"
                    );

                    if (selectedSeats.length == 0) {
                      toast.warn("Koltuk seçmediniz");
                    } else if (
                      isVerifyingDone.length !== selectedSeats.length
                    ) {
                      toast.error(
                        "Kullanıcı bilgilerini doğrulamadan ilerleyemezsiniz"
                      );
                    } else {
                      setTotalPrice(
                        searchResults?.price
                          ? searchResults.price * selectedSeats.length
                          : 0
                      );
                      setSelectedSeats([]);
                      router.push("/payment");
                      console.clear();
                    }
                  }}
                >
                  Ödeme
                </button>
              </main>
              <ToastContainer />
            </div>

            {isModalOpen === 1 && (
              <GenderModal
                onGenderSubmit={handleGenderSubmit}
                isModalOpen={isModalOpen}
              />
            )}
          </div>
          <div className="col-4"></div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SeatSelectionPage;
