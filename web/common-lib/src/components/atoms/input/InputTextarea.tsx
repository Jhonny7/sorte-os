import { useTheme } from "../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React from "react";
import { useTranslation } from "react-i18next";

interface InputTextareaProps {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
}

export default function InputTextarea({
  inputData,
  index,
  onChange,
  onBlur,
}: InputTextareaProps) {
  const { t } = useTranslation();
  const theme: any = useTheme();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputData.value = event.target.value;
    inputData.hasError = false;
    onChange(inputData, index);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    inputData.value = event.target.value;
    inputData.hasError = false;
    onBlur(inputData, index);
  };

  return (
    <div className={`master-area ${inputData.extraComponent ? "inp-icon" : ""}`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.textColor }}>
          {t(inputData.label!)}
        </p>
      )}

      <textarea
        id={inputData.id ?? ""}
        value={inputData.value ? inputData.value : null}
        cols={inputData.cols ?? 30}
        rows={inputData.rows ?? 3}
        className="arsa-input"
        placeholder={t(inputData.placeholder)}
        maxLength={inputData.maxLength ?? 100}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          height: "auto",
        }}
      />
      {inputData.extraComponent}
    </div>
  );
}
