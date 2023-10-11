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
import { ToastContainer } from "react-toastify";
import Footer from "@/src/components/Footer";

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
    <form className="search-form" onSubmit={handleLogin}>
      <div className="form-group py-2">
        <label className="form-label py-1">Kullanıcı Adı</label>
        <input
          type="text"
          className="form-control py-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group py-2">
        <label className="form-label py-1">Parola</label>
        <input
          className="form-control py-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="btn btn-primary my-3" type="submit">
        Giriş Yap
      </button>

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
    console.clear();
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
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4"></div>
          <div className="col-md-4">
            <ToastContainer />
            <div className="row justify-content-center p-0 border rounded-3">
              <main className="col-md p-4 border form-container">
                <h2>Giriş Yap</h2>
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
              </main>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
