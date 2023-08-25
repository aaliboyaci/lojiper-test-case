"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "../styles/Home.css";
import { MainContext } from "../Context/mainProvider";
import { useRouter } from "next/navigation";
import { User } from "../../business-logic/userValidation";
import Loading from "../components/Loading";
import "./register.css";
import Link from "next/link";
import "../components/SuccessRegister.css";
import { saveUser } from "@/business-logic/userRegister";

export default function Register() {
  const router = useRouter();
  const { isLogin, setIsLogin, setUserName } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstlName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [uniqueName, setUniqueName] = useState("");

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      email &&
      password &&
      firstName &&
      lastName &&
      gender &&
      birthDay &&
      birthMonth &&
      birthYear &&
      uniqueName
    ) {
      setIsLoading(true);

      const newUserInfo: User = {
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
      saveUser(newUserInfo);
      setUserName(firstName);
      router.push("/login");
    } else {
      setError("Lütfen tüm alanları doldurun");
    }
  };

  return (
    <div className="register-container">
      <Link href="/">Anasayfa</Link>
      <div className="register-form">
        <h1>Kayıt Ol</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Parola</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>İsim</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstlName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Soyisim</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              value={uniqueName}
              onChange={(e) => setUniqueName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cinsiyet</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Seçin</option>
              <option value="female">Kadın</option>
              <option value="male">Erkek</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Doğum Günü</label>
            <div className="birthdate-inputs">
              <input
                type="text"
                placeholder="gün"
                maxLength={2}
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
              />
              <span>/</span>
              <input
                type="text"
                placeholder="ay"
                maxLength={2}
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
              />
              <span>/</span>
              <input
                type="text"
                placeholder="yyyy"
                maxLength={4}
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
          {isLoading && <Loading />}
        </form>
      </div>
    </div>
  );
}
