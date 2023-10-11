"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../src/components/Loading";
import { validateUserLogin } from "../../business-logic/userValidation";
import { MainContext } from "../Context/mainProvider";
import { LoginFormProps } from "../../src/Interfaces/uiRelatedTypes";
import Header from "../../src/components/Header";
import "../../src/styles/MainStyles.css";

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  error,
  isLoading,
  handleLogin,
  handleRegisterRedirect,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Parola</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Giriş Yap</button>
      <br></br>
      <br></br>
      {isLoading && <Loading />}
      <p>
        Hesabınız yok mu?
        <span
          onClick={handleRegisterRedirect}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Kayıt olun
        </span>
      </p>
    </form>
  );
};

const Login = () => {
  const { isLogin, setIsLogin, setUserName, setUserGender } =
    useContext(MainContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = await validateUserLogin(
      username,
      password,
      setError,
      setIsLoading,
      setIsLogin,
      setUserName,
      setUserGender
    );
  };

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="main">
      <Header />
      <div className="border p-4">
        <h1>Kullanıcı Girişi</h1>

        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
          isLoading={isLoading}
          handleLogin={handleLogin}
          handleRegisterRedirect={handleRegisterRedirect}
        />
      </div>
    </div>
  );
};

export default Login;
