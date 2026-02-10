import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputPhone({
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
    const [inputEnter, setMessage] = useState("");

    const handleChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 0) {
            inputData.hasError = false;
            inputData.errorMessage = "";
        }

        if (!inputData.noUpdate) {
            inputData.value = value;
            inputData.hasError = false;
            setMessage(value);
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

    const renderType = () => {
        let input = <></>;
        switch (inputData.forceType ? inputData.forceType : inputData.type) {
            case "phone":
                input = (
                    <div
                        className={`master-input ${inputData.extraComponent ? "inp-icon" : ""
                            }`}
                        style={{
                            width: "100%",
                        }}
                    >
                        {inputData.hasTopLabel && (
                            <p className="top-label" style={{
                                color: theme.theme.textColor
                            }}>{t(inputData.label!)}</p>
                        )}
                        {inputData.extraLeftComponent}
                        <input
                            type={inputData.type}
                            id={inputData.id}
                            className={`arsa-input ${inputData.hasError ? "round-error" : ""
                                }`}
                            value={inputData.value ? inputData.value : null}
                            placeholder={t(inputData.placeholder)}
                            maxLength={inputData.maxLength ? inputData.maxLength : 100}
                            onInput={handleChange}
                            onBlur={(e) => {
                                if (onBlur) {
                                    handleBlur(e);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Backspace" ||
                                    e.key === "Tab" ||
                                    e.key === "ArrowLeft" ||
                                    e.key === "ArrowRight" ||
                                    e.key === "Delete"
                                ) {
                                    return;
                                }

                                if (!/^[0-9]$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            style={{
                                borderColor: theme.theme.textColor,
                                position: "relative"
                            }}
                            pattern="[0-9]*"
                            inputMode="numeric"
                        />

                        {inputData.extraComponent}
                    </div>
                );
                break;
        }
        return input;
    };

    return (
        <section
            className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form ${inputData.type == "between" ? "between-dates" : ""}`}
        >
            {renderType()}
            {inputData.required && inputData.hasError && (
                <p className="error">{inputData.errorMessage}</p>
            )}
        </section>
    );
}
