"use client";
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../Context/mainProvider";
import seatNumberCreator from "@/src/components/ticketComponents/seatNumberCreator";

interface TravelInfoProps {
  selectedSeats: string[];
}

const TravelInfoPage: React.FC<TravelInfoProps> = ({ selectedSeats }) => {
  const { userGender } = useContext(MainContext);

  return (
    <div>
      <h4 className="py-4">Seçilen Yolcu Bilgileri</h4>
      {selectedSeats.map((seat) => {
        const seatNo = seat.slice(0, 2);
        const seatGender = seat.charAt(2);
        return (
          <div className="row-auto border p-2 my-2" key={seat}>
            <div className="col-auto"></div>
            <b>Koltuk No: {seatNumberCreator(seatNo)}</b>
            <span> Cinsiyet: {seatGender === "f" ? "Kadın" : "Erkek"}</span>
            <input className="my-2" placeholder="TC Kimlik NO"></input>
            <input className="my-2" placeholder="İsim Soyisim"></input>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default TravelInfoPage;
