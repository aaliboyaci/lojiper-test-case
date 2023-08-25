"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeatSelectionPage: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const router = useRouter();

  const numRows = 5;
  const numCols = 4;

  const busLayout: (string | null)[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(null)
  );

  const handleSeatClick = (row: number, col: number) => {
    const seat = `${row}${col}`;

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
    const basePrice = 50;
    return basePrice * selectedSeats.length;
  };

  const handleContinue = () => {
    router.push("/payment");
  };

  return (
    <div className="seat-selection-page">
      <h1>Sefer Detayları ve Fiyat</h1>
      <div className="bus-layout">
        {busLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="bus-row">
            {row.map((_, colIndex) => (
              <div
                key={colIndex}
                className={`bus-seat ${
                  selectedSeats.includes(`${rowIndex}${colIndex}`)
                    ? "selected"
                    : ""
                } ${colIndex === 1 ? "gapBetween" : ""}`}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {selectedSeats.includes(`${rowIndex}${colIndex}`)
                  ? "X"
                  : `${rowIndex * numCols + colIndex + 1}`}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="total-price">
        Toplam Ücret: {calculateTotalPrice()} TL
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Devam Et
      </button>
      <ToastContainer />
      <style jsx>{`
        .seat-selection-page {
          text-align: center;
          padding: 20px;
        }
        .bus-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .bus-row {
          display: flex;
          gap: 10px;
        }
        .bus-seat {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .bus-seat.selected {
          background-color: #3498db;
          color: #fff;
        }
        .bus-seat.occupied {
          background-color: #e74c3c;
          color: #fff;
        }
        .occupied-icon {
          font-size: 14px;
        }
        .gapBetween {
          margin-right: 20px;
        }
        .total-price {
          font-size: 18px;
          margin-top: 20px;
        }
        .continue-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #2ecc71;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SeatSelectionPage;
