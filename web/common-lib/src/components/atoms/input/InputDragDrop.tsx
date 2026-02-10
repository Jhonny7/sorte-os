import { useTheme } from "../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputDragDrop({
  inputData,
  index,
  onChange,
  onBlur
}: {
  inputData: InputInterface & { valueAlt?: string };
  index: number;
  onChange: Function;
  onBlur: Function;
}) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [inputEnter, setMessage] = useState("");
  const dropRef = useRef<HTMLLabelElement>(null);

  const handleChange = (event: any) => {
    const value = event?.target?.value;

    if (value?.length > 0) {
      const updated = { ...inputData, hasError: false, errorMessage: "" };
      if (!inputData.noUpdate) {
        updated.value = value;
        setMessage(value);
      }
      onChange(updated, index);
    } else {
      onChange({ ...inputData }, index);
    }
  };

  const handleBlur = (event: any) => {
    const value = event?.target?.value;

    const updated = { ...inputData };
    if (!inputData.noUpdate) {
      updated.value = value;
      updated.hasError = false;
      setMessage(value);
    }
    onBlur(updated, index);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    void validateAndSetFile(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    void validateAndSetFile(file);
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("read error"));
      reader.readAsDataURL(file);
    });

  const validateAndSetFile = async (file?: File) => {
    if (!file) return;

    const allowed = inputData.allowedFormats || [];
    const maxSizeMB = inputData.maxSizeMB || 1.5;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const isValidExt = allowed.includes(ext || "");
    const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

    if (!isValidExt) {
      onChange({
        ...inputData,
        hasError: true,
        errorMessage: t("Archivo no compatible")
      }, index);
      return;
    }

    if (!isValidSize) {
      onChange({
        ...inputData,
        hasError: true,
        errorMessage: t(`Archivo excede el límite de ${maxSizeMB}MB`)
      }, index);
      return;
    }

    const base64 = await fileToBase64(file);
    const updated = {
      ...inputData,
      value: file,
      valueAlt: base64,
      hasError: false,
      errorMessage: ""
    };
    onChange(updated, index);
  };

  const renderType = () => {
    switch (inputData.forceType ? inputData.forceType : inputData.type) {
      case "file":
        return (
          <div className="dropinter">
            <label
              ref={dropRef}
              htmlFor={inputData.id}
              className={`dropzone ${inputData.hasError ? "errorz" : ""}`}
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {!inputData.valueAlt && (
                <>
                  {inputData.hasTopLabel && (
                    <p className="top-label" style={{ color: theme.theme.primary }}>
                      {t(inputData.label!)}
                    </p>
                  )}
                  <div className="dropzone-inner">
                    <span className="material-icons" style={{ fontSize: 40, color: theme.theme.primary }}>
                      image
                    </span>
                    <p style={{ color: theme.theme.primary }}>
                      {t(inputData.placeholder) ?? "Suba una imagen 1200x1200 px"}
                    </p>
                    <small>{`JPG o PNG | Máx ${inputData.maxSizeMB || 1.5} MB`}</small>
                  </div>
                </>
              )}

              {!!inputData.valueAlt && (
                <div className="dropzone-preview">
                  <img src={inputData.valueAlt} alt={t("Imagen seleccionada") as string} />
                </div>
              )}

              <input
                id={inputData.id}
                type="file"
                accept={inputData.allowedFormats?.map((ext) => "." + ext).join(",")}
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </label>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <section
      className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form ${
        inputData.type == "between" ? "between-dates" : ""
      }`}
    >
      {renderType()}
    </section>
  );
}