"use client";
import React, { useState } from "react";
import "../../src/styles/MainStyles.css";
import { useRouter } from "next/navigation";
import Loading from "../../src/components/Loading";
import "../../src/styles/registerStyles.css";
import { saveUser } from "@/business-logic/userRegister";
import FormInput from "../../src/components/registerComponents/FormInput";
import BirthdateInput from "../../src/components/registerComponents/BirthdateInput";
import "react-toastify/dist/ReactToastify.css";
import {
  showToastFail,
  showToastSuccess,
} from "../../src/components/registerComponents/ShowToast";
import { ToastContainer } from "react-toastify";
import Header from "../../src/components/Header";
import Footer from "@/src/components/Footer";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [uniqueName, setUniqueName] = useState("");

  const validateForm = () => {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !gender ||
      !birthDay ||
      !birthMonth ||
      !birthYear ||
      !uniqueName
    ) {
      setError("Lütfen tüm alanları doldurun");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);

      const newUserInfo = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear,
        username: uniqueName,
      };

      setError("");
      const isSaved = await saveUser(newUserInfo);

      if (isSaved) {
        showToastSuccess("kayıt başarılı");
        setError("");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 2400);
      } else if (!isSaved) {
        setIsLoading(false);
        showToastFail("Bu kullanıcı adı kullanılıyor");
        setError("Bu kullanıcı adı kullanılıyor");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4"></div>
          <div className="col-md-4">
            <ToastContainer />
            <div className="row justify-content-center p-0 border rounded-3">
              <main className="col-md p-4 border form-container">
                <h2>Kayıt Ol</h2>
                <form className="search-form" onSubmit={handleRegister}>
                  <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  />
                  <FormInput
                    label="Parola"
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />
                  <FormInput
                    label="İsim"
                    type="text"
                    value={firstName}
                    onChange={setFirstName}
                  />
                  <FormInput
                    label="Soyisim"
                    type="text"
                    value={lastName}
                    onChange={setLastName}
                  />
                  <FormInput
                    label="Kullanıcı Adı"
                    type="text"
                    value={uniqueName}
                    onChange={setUniqueName}
                  />
                  <FormInput
                    label="Cinsiyet"
                    type="select"
                    value={gender}
                    onChange={setGender}
                    options={[
                      { value: "", label: "Seçin" },
                      { value: "female", label: "Kadın" },
                      { value: "male", label: "Erkek" },
                    ]}
                  />
                  <BirthdateInput
                    birthDay={birthDay}
                    birthMonth={birthMonth}
                    birthYear={birthYear}
                    onDayChange={setBirthDay}
                    onMonthChange={setBirthMonth}
                    onYearChange={setBirthYear}
                  />

                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="register-button my-1">
                    Kayıt Ol
                  </button>
                  {isLoading && <Loading />}
                </form>
              </main>
            </div>

            <Footer />
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}
