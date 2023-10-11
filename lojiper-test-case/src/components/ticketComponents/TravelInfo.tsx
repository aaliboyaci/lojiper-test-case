"use client";
import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "@/src/styles/ticketStyle.css";
import {
  MainContext,
  UserTicketSelect,
} from "../../../app/Context/mainProvider";
import seatNumberCreator from "@/src/components/ticketComponents/seatNumberCreator";

export interface TravelInfoProps {
  selectedSeats: string[];
}

const TravelInfoPage: React.FC<TravelInfoProps> = ({ selectedSeats }) => {
  const { setNewSelectedSeats, newSelectedSeats } = useContext(MainContext);
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const seat = form.getAttribute("data-seat");
    const TCNO = form.elements.namedItem("TCNO") as HTMLInputElement;
    const isimSoyisim = form.elements.namedItem(
      "isimSoyisim"
    ) as HTMLInputElement;

    if (!TCNO?.value || !isimSoyisim?.value) {
      toast.error(
        `Koltuk No: ${seat} için TC Kimlik NO ve İsim Soyisim alanlarını doldurun.`
      );
    } else {
      const newUserTicket: UserTicketSelect = {
        newUserGender: seat?.charAt(2) === "f" ? "female" : "male",
        newUserTCNO: TCNO.value,
        newUserName: isimSoyisim.value,
        newUserSeat: seat,
      };

      setNewSelectedSeats((prevSelectedSeats: UserTicketSelect[]) => [
        ...prevSelectedSeats,
        newUserTicket,
      ]);

      toast.success(`Koltuk No: ${seat} rezervasyonu kaydedildi`);
      const divDisable = document.querySelector(
        `.row-auto.border.p-2.my-2.yolcu-${seat}`
      );
      divDisable?.classList.add("ticket-info-disabled");
    }
  };

  return (
    <div>
      <h4 className="py-1">Seçilen Yolcu Bilgileri</h4>
      {selectedSeats.map((seat) => {
        const seatNo = seat.slice(0, 2);
        const seatGender = seat.charAt(2);
        const uniqueClassName = `yolcu-${seatNo}`;

        return (
          <div
            className={`row-auto border rounded-3 p-2 my-2 ${uniqueClassName}`}
            key={seat}
          >
            <form
              onSubmit={handleFormSubmit}
              data-seat={seatNo}
              className={uniqueClassName}
            >
              <div className="col-auto"></div>
              <b>Koltuk No: {seatNumberCreator(seatNo)}</b>
              <span> Cinsiyet: {seatGender === "f" ? "Kadın" : "Erkek"}</span>
              <input
                className="form-control my-2"
                name="TCNO"
                placeholder="TC Kimlik NO"
              />
              <input
                className="form-control my-2"
                name="isimSoyisim"
                placeholder="İsim Soyisim"
              />
              <button
                className="btn btn-primary"
                type="submit"
                data-seat={seatNo}
              >
                Doğrula
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default TravelInfoPage;
