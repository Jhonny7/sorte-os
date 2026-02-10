"use client";
import QRCode from "react-qr-code";

interface Props {
  value: string;
  size?: number;
  lightBg?: boolean; // true = cajita blanca como en el mock
}

export default function QRBox({ value, size = 140, lightBg = true }: Props) {
  return (
    <div className={`rc-qr__box ${lightBg ? "rc-qr__box--light" : ""}`}>
      <QRCode value={value} size={size}  />
    </div>
  );
}
