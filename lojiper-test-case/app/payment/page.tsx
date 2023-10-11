"use client";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../Context/mainProvider";
import Link from "next/link";
import Loading from "../../src/components/Loading";
import Header from "../../src/components/Header";
import "../../src/styles/MainStyles.css";
import verifiedImage from "../../src/images/check.png";
import Image from "next/image";

const PaymentPage: React.FC = () => {
  const {
    totalPrice,
    setTotalPrice,
    newSelectedSeats,
    userSearchQuery,
    setNewUserGender,
    setNewSelectedSeats,
  } = useContext(MainContext);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !paymentInfo.cardNumber ||
      !/^\d{16}$/.test(paymentInfo.cardNumber) ||
      !paymentInfo.cardHolder ||
      !/^[A-Za-z\s]+$/.test(paymentInfo.cardHolder) ||
      !paymentInfo.expirationDate ||
      !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(paymentInfo.expirationDate) ||
      !paymentInfo.cvv ||
      !/^\d{3,4}$/.test(paymentInfo.cvv)
    ) {
      toast.error("Lütfen geçerli ödeme bilgilerini doldurun.");
      return;
    }

    setIsPaymentProcessing(true);

    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaymentSuccessful(true);
      toast.success("Ödeme başarıyla tamamlandı!");
    }, 1800);
  };
  console.log(newSelectedSeats);
  return (
    <div className="main">
      <Header />
      <h1>Ödeme</h1>
      <br></br>
      <h4>Ödeme Özeti</h4>
      <p className="mt-2">
        {userSearchQuery.inputDate} tarihinde {userSearchQuery.departCity}{" "}
        {userSearchQuery.arrivalCity}
      </p>

      <div className="list-group my-3 mb-4">
        {newSelectedSeats.map((userTicket, index) => (
          <>
            <li
              className="list-group-item list-group-item-action d-flex gap-3 py-3"
              key={index}
            >
              <Image
                src={verifiedImage}
                alt="verified ticket"
                style={{ width: "16px", height: "16px" }}
              ></Image>
              <h6 className="mb-0">Koltuk:{userTicket.newUserSeat}</h6>
              <p className="mb-0 opacity-75"> İsim: {userTicket.newUserName}</p>
            </li>
          </>
        ))}
      </div>
      <h2 className="my-3">Toplam Tutar: {totalPrice} ₺</h2>

      {isPaymentProcessing ? (
        <Loading />
      ) : (
        <>
          {isPaymentSuccessful ? (
            <>
              <p>Ödeme başarıyla tamamlandı!</p>
              <Link
                href="/"
                onClick={() => {
                  setTotalPrice(0);
                  setNewUserGender("");
                  setNewSelectedSeats([]);
                }}
              >
                Anasayfaya Dön
              </Link>
            </>
          ) : (
            <div className="payment-form">
              <form onSubmit={handlePaymentSubmit}>
                <label htmlFor="cardNumber">Kart Numarası</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Kart numarası 16 haneli bir sayı olmalıdır"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                />

                <label htmlFor="cardHolder">Kart Sahibi</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="Sadece harf ve boşluk içerebilir"
                  value={paymentInfo.cardHolder}
                  onChange={handleInputChange}
                />

                <label htmlFor="expirationDate">
                  Son Kullanma Tarihi (AA/YY)
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={paymentInfo.expirationDate}
                  onChange={handleInputChange}
                  placeholder="AA/YY formatında olmalıdır"
                  maxLength={5}
                />

                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="3 veya 4 haneli bir sayı olmalı"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  maxLength={3}
                />

                <button onClick={handlePaymentSubmit}>Ödemeyi Onayla</button>
              </form>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
