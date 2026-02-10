import { useEffect, useState } from "react";
import { LocalStorageEncryptService } from "../services/LocalStorageEncrypt";

export const useDeviceDetect = () => {
  const [size, setSize] = useState({});

  useEffect(() => {
    function updateSize() {
      let deviceData: any = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile:
          window.innerWidth <= 720,
      };
      setSize(deviceData);
      LocalStorageEncryptService.setToLocalStorage("deviceData", deviceData);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return LocalStorageEncryptService.getFromLocalStorage("deviceData");
};

export default useDeviceDetect;