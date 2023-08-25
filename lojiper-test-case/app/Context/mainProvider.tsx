"use client";
import React, { createContext, useEffect, useState } from "react";
export interface UserInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  username: string;
}

interface MainContextProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}
interface MainProviderProps {
  children: React.ReactNode;
}
export const MainContext = createContext<MainContextProps>({
  isLogin: false,
  setIsLogin: () => {},
  userName: "",
  setUserName: () => {},
});
export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const contextValues: MainContextProps = {
    isLogin,
    setIsLogin,
    userName,
    setUserName,
  };
  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};
