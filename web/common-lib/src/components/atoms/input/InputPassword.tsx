"use client";

import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface InputPasswordProps {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
}

export default function InputPassword({
  inputData,
  index,
  onChange,
  onBlur,
}: InputPasswordProps) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [inputEnter, setMessage] = useState("");
  const [view, setView] = useState(false);

  const handleChange = (event) => {
    if (event.target.value?.length > 0) {
      inputData.hasError = false;
      inputData.errorMessage = "";
    }

    if (!inputData.noUpdate) {
      inputData.value = event.target.value;
      inputData.hasError = false;
      setMessage(event.target.value);
      onChange(inputData, index);

    } else {
      onChange(inputData, index);

    }
  };

  const handleBlur = (event) => {
    if (!inputData.noUpdate) {

      inputData.value = event.target.value;
      inputData.hasError = false;
      setMessage(event.target.value);
      onBlur(inputData, index);

    } else {
      onBlur(inputData, index);

    }
  };

  return (
    <div className={`${inputData.extraComponent ? "inp-icon" : "secret"} ${inputData.globalExtraClass} ${inputData.extraClass} gp-form ${inputData.type == "between" ? "between-dates" : ""}`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{
          color: theme.theme.textColor
        }}>{t(inputData.label!)} </p>
      )}
      {inputData.extraLeftComponent}
      <input
        type={view ? "text" : "password"}
        className={`arsa-input ${inputData.hasError ? "round-error" : ""}`}
        id={inputData.id ?? ""}
        value={inputData.value ? inputData.value : null}
        placeholder={t(inputData.placeholder)}
        maxLength={inputData.maxLength ?? 100}
        name={inputData?.name}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          borderColor: theme.theme.textColor,
          position: "relative"
        }}
      />
      {!inputData.hasEye && inputData.extraComponent}

      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </div>
  );
}
