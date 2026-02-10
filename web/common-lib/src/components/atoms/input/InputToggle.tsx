import React, { useState, useEffect } from "react";
import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import { useTranslation } from "react-i18next";

type Props = {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
};

export default function InputToggle({ inputData, index, onChange, onBlur }: Props) {
  const theme: any = useTheme();
  const { t } = useTranslation();

  // Normaliza value de inputData a boolean
  const normalize = (v: any) =>
    v === true || v === "true" || v === 1 || v === "1";

  const [checked, setChecked] = useState<boolean>(normalize(inputData.value));

  useEffect(() => {
    // Mantener sincronizado si value viene desde afuera
    setChecked(normalize(inputData.value));
  }, [inputData.value]);

  const updateAndNotify = (next: boolean) => {
    // Mutamos inputData al mismo estilo del InputText (si ese es el patrón)
    inputData.value = next;
    inputData.hasError = false;
    setChecked(next);
    onChange && onChange(inputData, index);
  };

  const handleToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (inputData.disabled) return;
    const next = !checked;
    updateAndNotify(next);
    // Si blur es necesario después de la acción, no lo llamamos aquí (dejar que pierda foco)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle(e);
    }
    // Si necesitas onBlur keyboard, puedes detectar Tab y llamar onBlur
  };

  const handleBlur = (e: React.FocusEvent) => {
    inputData.value = checked;
    inputData.hasError = false;
    onBlur && onBlur(inputData, index);
  };

  return (
    <section
      className={`${inputData.globalExtraClass ?? ""} ${inputData.extraClass ?? ""} gp-form input-toggle-wrapper`}
    >
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.textColor }}>
          {t(inputData.label!)}
        </p>
      )}

      <div
        role="switch"
        tabIndex={inputData.disabled ? -1 : 0}
        aria-checked={checked}
        className={`toggle-chip ${checked ? "checked" : "unchecked"} ${inputData.disabled ? "disabled" : ""}`}
        onClick={(e) => handleToggle(e)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        style={{
          ["--toggle-track-bg" as any]: checked ? theme?.theme?.primaryColor ?? "#bf2800" : "#e6e6e6",
          ["--toggle-thumb-bg" as any]: "#fff",
          ["--toggle-border" as any]: checked ? "transparent" : "#d0d0d0",
        }}
      >
        <div className="toggle-track">
          <div className="toggle-thumb" />
        </div>
        {inputData.placeholder && <span className="toggle-label">{t(inputData.placeholder ?? "")}</span>}
      </div>

      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}
