import { useTheme } from "../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputOTP({
  inputData,
  index,
  onChange,
  onBlur
}: {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
}) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const length = inputData.maxLength || 6;
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputData.value = values.join("");
    onChange(inputData, index);
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newValues = [...values];
    newValues[i] = val;
    setValues(newValues);

    if (val) {
      const nextIndex = i + 1;
      setTimeout(() => {
        if (inputsRef.current[nextIndex]) {
          inputsRef.current[nextIndex]?.focus();
        }
      }, 10);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").replace(/[^0-9]/g, "").slice(0, length);
    const newValues = pasted.split("").concat(Array(length).fill("")).slice(0, length);
    setValues(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      if (values[i]) {
        const newValues = [...values];
        newValues[i] = "";
        setValues(newValues);
      } else if (inputsRef.current[i - 1]) {
        inputsRef.current[i - 1]?.focus();
        const newValues = [...values];
        newValues[i - 1] = "";
        setValues(newValues);
      }
    }
  };

  const firstEmptyIndex = values.findIndex(v => v === "");
  const lastFilledIndex = values.lastIndexOf("");

  const renderType = () => (
    <div className="otp-input-wrapper" style={{ display: "flex", gap: 8 }}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.primary }}>{t(inputData.label!)}</p>
      )}
      {Array.from({ length }).map((_, i) => {
        const isDisabled = i > values.findIndex(v => v === "") && !values[i];
        return (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}

            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={isDisabled}
            value={values[i]}
            onChange={(e) => handleChange(e, i)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onBlur={() => onBlur(inputData, index)}
            className="otp-input"
            style={{
              width: `calc(100% / ${length})`,
              height: 40,
              marginBottom: 20,
              textAlign: "center",
              border: "none",
              background: "transparent",
              borderBottom: `1px solid ${theme.theme.primary}`,
              opacity: isDisabled ? 0.3 : 1,
              pointerEvents: isDisabled ? "none" : "auto"
            }}
          />
        );
      })}
    </div>
  );

  return (
    <section
      className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form ${inputData.type === "otp" ? "otp-form" : ""}`}
    >
      {renderType()}
      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}
