import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import { useTranslation } from "react-i18next";

type Props = {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
};

export default function InputSelect({ inputData, index, onChange, onBlur }: Props) {
  const theme: any = useTheme();
  const { t } = useTranslation();

  // searchTerm para hasSearch
  const [searchTerm, setSearchTerm] = useState<string>("");
  // local value for controlled select display (keeps sync with inputData.value)
  const [localValue, setLocalValue] = useState<any>(inputData.value ?? "");

  // sincronizar si inputData.value cambia desde afuera
  useEffect(() => {
    setLocalValue(inputData.value ?? "");
  }, [inputData.value]);

  const values = (inputData.values ?? []) as Array<{ value: any; label: string }>;

  // filtrado según searchTerm (si aplica)
  const filtered = useMemo(() => {
    if (!inputData.hasSearch || !searchTerm) return values;
    const term = searchTerm.toString().toLowerCase();
    return values.filter((v) => (v.label ?? "").toString().toLowerCase().includes(term) || (v.value ?? "").toString().toLowerCase().includes(term));
  }, [values, searchTerm, inputData.hasSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    // si valor numérico almacenado, intenta parsear; si no, deja string
    const parsed = (() => {
      // Mantener tipo: si existe un value idéntico en values y es number, convertir
      const matched = values.find((it) => String(it.value) === v);
      if (matched) return matched.value;
      // fallback: devolver string
      return v;
    })();

    if (!inputData.noUpdate) {
      inputData.value = parsed;
      inputData.hasError = false;
      setLocalValue(parsed);
      onChange && onChange(inputData, index);
    } else {
      onChange && onChange(inputData, index);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    if (!inputData.noUpdate) {
      inputData.value = localValue;
      inputData.hasError = false;
      onBlur && onBlur(inputData, index);
    } else {
      onBlur && onBlur(inputData, index);
    }
  };

  return (
    <section
      className={`${inputData.globalExtraClass ?? ""} ${inputData.extraClass ?? ""} gp-form input-select-wrapper`}
    >
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.textColor }}>
          {t(inputData.label!)}
        </p>
      )}

      <div className={`master-select ${inputData.hasError ? "round-error" : ""}`} style={{ width: "100%" }}>
        {inputData.extraLeftComponent}

        {inputData.hasSearch && (
          <input
            className="select-search"
            type="search"
            placeholder={t(inputData.placeholder ?? "")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderColor: theme.theme.textColor,
              marginBottom: 8,
              width: "100%",
            }}
            disabled={!!inputData.disabled}
          />
        )}

        <select
          id={inputData.id}
          className={`arsa-select ${inputData.hasError ? "round-error" : ""}`}
          value={String(localValue ?? "")}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!!inputData.disabled}
          aria-invalid={!!inputData.hasError}
          style={{
            borderColor: theme.theme.textColor,
            width: "100%",
            minHeight: 40,
          }}
        >
          {/* placeholder/empty option */}
          {inputData.hasPlaceholder !== false && (
            <option value="">{inputData.placeholder ? t(inputData.placeholder) : ""}</option>
          )}

          {filtered.map((opt, i) => (
            <option key={i} value={String(opt.value ?? "")}>
              {t(opt.label ?? String(opt.value ?? ""))}
            </option>
          ))}
        </select>

        {inputData.extraComponent}
      </div>

      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}
