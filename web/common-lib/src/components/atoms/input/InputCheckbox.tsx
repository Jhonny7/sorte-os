import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { InputInterface } from "../../../types/Input.types";

interface CheckboxOption {
  value: string;
  label: string;
}

interface Props {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
}

export default function InputCheckbox({ inputData, index, onChange, onBlur }: Props) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [inputEnter, setMessage] = useState("");

  const handleChange = (value: string) => {
  // modo puede venir en inputData.checkboxMode (si no, fallback 'toggle')
  const mode = (inputData as any).checkboxMode ?? "toggle";

  // normalizar currentValues: si inputData.value es string lo convertimos a array
  const currentValues: string[] = Array.isArray(inputData.value)
    ? inputData.value
    : inputData.value
      ? [String(inputData.value)]
      : [];

  let updatedValues: string[] = [];

  if (mode === "toggle") {
    // toggle: si ya está seleccionado, lo quitamos; si no, lo añadimos
    if (currentValues.some((v) => String(v) === String(value))) {
      updatedValues = currentValues.filter((v) => String(v) !== String(value));
    } else {
      updatedValues = [...currentValues, value];
    }
  } else {
    // comportamiento antiguo por compatibilidad (single-select-like)
    updatedValues = currentValues.includes(value) ? [] : [...currentValues, value];
  }

  // Mantener compatibilidad con tu código: guardar solo el primer valor (o "" si none)
  const finalValue = updatedValues.length > 0 ? updatedValues[0] : "";

  inputData.value = finalValue;
  inputData.hasError = false;
  setMessage(finalValue);
  onChange(inputData, index);
};

  const renderCheckboxes = () => {
    return inputData.values?.map((option, idx) => {
      const isChecked = inputData.value?.includes(option.value);
      return (
        <label
          key={idx}
          className="checkbox-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
            cursor: "pointer",
            color: theme.theme.text,
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleChange(option.value)}
            onBlur={() => onBlur(inputData, index)}
          />
          <span className={`circle ${isChecked ? "checkd" : ""} ${(inputData as any).checkboxMode == 'toggle' ? 'squartle' : ''}`}></span>
          {t(option.label)}
        </label>
      );
    });
  };

  return (
    <section className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.primary }}>
          {t(inputData.label!)}
        </p>
      )}
      <section className="values">
        {renderCheckboxes()}
      </section>
      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}
