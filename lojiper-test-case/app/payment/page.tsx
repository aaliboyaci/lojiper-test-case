"use client";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../Context/mainProvider";
import Link from "next/link";
import Loading from "../../src/components/Loading";
import Header from "../../src/components/Header";
import "../../src/styles/MainStyles.css";

const PaymentPage: React.FC = () => {
  const { totalPrice, setTotalPrice } = useContext(MainContext);
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
      paymentInfo.cardNumber === "" ||
      paymentInfo.cardHolder === "" ||
      paymentInfo.expirationDate === "" ||
      paymentInfo.cvv === ""
    ) {
      toast.error("Lütfen tüm ödeme bilgilerini doldurun.");
      return;
    }

    setIsPaymentProcessing(true);

    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaymentSuccessful(true);
      toast.success("Ödeme başarıyla tamamlandı!");
    }, 1800);
  };

  return (
    <div className="main">
      <Header />
      <h1>Ödeme</h1>
      <h2>Toplam Tutar: {totalPrice} ₺</h2>

      {isPaymentProcessing ? (
        <Loading />
      ) : (
        <>
          {isPaymentSuccessful ? (
            <>
              <p>Ödeme başarıyla tamamlandı!</p>
              <Link href="/" onClick={() => setTotalPrice(0)}>
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
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                />

                <label htmlFor="cardHolder">Kart Sahibi</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
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
                  placeholder="AA/YY"
                  maxLength={5}
                />

                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
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
