import { UserData } from "@/types";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const baseUrl =
  "https://stellar-wrapped-api-production.up.railway.app/v1/wallet";

interface PublicKeyContextType {
  publicKey: string | null;
  setPublicKey: (key: string | null) => void;
  userData: UserData | undefined;
  isFetching: boolean;
  fetchUserData: (key: string, data?: UserData) => Promise<void>;
}

const PublicKeyContext = createContext<PublicKeyContextType | undefined>(
  undefined
);

export function PublicKeyProvider({ children }: { children: React.ReactNode }) {
  const [publicKey, setPublicKeyState] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  // console.log(publicKey);
  console.log("user data is", userData);

  const setPublicKey = (key: string | null) => {
    setPublicKeyState(key);
    if (key) {
      if (typeof window !== "undefined") {
        localStorage.setItem("publicKey", key);
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("publicKey");
      }
    }
  };

  const fetchUserData = async (key: string, data?: UserData) => {
    // console.log("this ran");
    setIsFetching(true);

    const url = `${baseUrl}/${key}/activity-summary`; // Add address as a query parameter
    const response = await axios.get(url); // Axios GET request

    setUserData(response.data);
    setIsFetching(false);
    setPublicKey(key);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPublicKey = localStorage.getItem("publicKey");
      if (storedPublicKey) {
        fetchUserData(storedPublicKey);
      }
    }
  }, [publicKey]);

  return (
    <PublicKeyContext.Provider
      value={{ publicKey, setPublicKey, userData, isFetching, fetchUserData }}
    >
      {children}
    </PublicKeyContext.Provider>
  );
}

export function usePublicKey() {
  const context = useContext(PublicKeyContext);
  if (context === undefined) {
    throw new Error("usePublicKey must be used within a PublicKeyProvider");
  }
  return context;
}
