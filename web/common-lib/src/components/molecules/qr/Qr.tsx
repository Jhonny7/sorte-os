"use client";
import { useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import "./qr.scss";

interface QRCodeComponentProps {
  width?: number;
  height?: number;
  data: string;
  forwardRef: React.RefObject<HTMLDivElement | null>;
}

export default function QRCodeComponent({
  width = 136,
  height = 136,
  data,
  forwardRef,
}: QRCodeComponentProps) {
  useEffect(() => {
    if (forwardRef.current) {
      const qrCode = new QRCodeStyling({
        width,
        height,
        type: "canvas",
        data,
        image: "",
        dotsOptions: {
          color: "#771AD6",
          type: "rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
      });

      // Limpia el contenido anterior y vuelve a agregar
      forwardRef.current.innerHTML = "";
      qrCode.append(forwardRef.current);
    }
  }, [width, height, data, forwardRef]);

  return (
    <div className="qr-container">
      <div ref={forwardRef} />
    </div>
  );
}
