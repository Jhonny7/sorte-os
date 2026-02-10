import LocalStorageEncryptService from "../services/LocalStorageEncrypt";
import { useState, useEffect } from "react";

export const useUserSession = (): any | null => {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    try {
      //const stored = sessionStorage.getItem("userSession");
      const stored = LocalStorageEncryptService.getFromLocalStorage("userSession", true)
      if (stored) {
        const parsed = JSON.parse(stored);
        setSession(parsed);
      }
    } catch (err) {
      console.warn("Error parsing sessionStorage userSession", err);
      setSession(null);
    }
  }, []);

  return session;
};

export default useUserSession;
