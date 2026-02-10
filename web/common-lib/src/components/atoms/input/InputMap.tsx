import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import Map from "../map/Map";


export default function InputMap({
  inputData,
  index,
  onChange,
  onBlur
}: {
  inputData: any;
  index: number;
  onChange: Function;
  onBlur: Function;
}) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [position, setPosition] = useState<[number, number]>(inputData.value || [19.4326, -99.1332]);

  const handleMapChange = (coords: [number, number]) => {
    inputData.value = coords;
    inputData.hasError = false;
    setPosition(coords);
    onChange(inputData, index);
  };

  return (
    <section className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme.primary }}>
          {t(inputData.label)}
        </p>
      )}
      <div style={{ width: "100%", height: "300px", borderRadius: "8px", overflow: "hidden" }}>
        <Map center={position} onMove={handleMapChange} />
      </div>
      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}
