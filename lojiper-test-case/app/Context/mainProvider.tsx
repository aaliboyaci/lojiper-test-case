"use client";
import React, { createContext, useState } from "react";

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

export interface UserSearchQuery {
  departCity: string;
  arrivalCity: string;
  inputDate: string;
}

interface MainContextProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  userSearchQuery: UserSearchQuery;
  setUserSearchQuery: React.Dispatch<React.SetStateAction<UserSearchQuery>>;
  userGender: string;
  setUserGender: React.Dispatch<React.SetStateAction<string>>;
}

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainContext = createContext<MainContextProps>({
  isLogin: false,
  setIsLogin: () => {},
  userName: "",
  setUserName: () => {},
  userSearchQuery: {
    departCity: "",
    arrivalCity: "",
    inputDate: "",
  },
  setUserSearchQuery: () => {},
  userGender: "",
  setUserGender: () => {},
});

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState<UserSearchQuery>({
    departCity: "",
    arrivalCity: "",
    inputDate: "",
  });

  const contextValues: MainContextProps = {
    isLogin,
    setIsLogin,
    userName,
    setUserName,
    userSearchQuery,
    setUserSearchQuery,
    userGender,
    setUserGender,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};
