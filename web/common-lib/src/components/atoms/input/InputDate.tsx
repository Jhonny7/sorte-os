import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputDate({
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
    const [lastValue, setLastValue] = useState(inputData.value || "");

    const formatDateToDDMMYYYY = (value: string) => {
        if (!value) return "";
        const [year, month, day] = value.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleChange = (event) => {
        let rawValue = event.target.value;

        rawValue = formatDateToDDMMYYYY(rawValue);

        if (rawValue.length > 0) {
            event.target.blur()
        }
    };

    const handleBlur = (event) => {
        let rawValue = event.target.value;
        console.log(rawValue);

        if (!rawValue || rawValue.length <= 0) {
            rawValue = lastValue
        } else {
            setLastValue(event.target.value)
        }
        rawValue = formatDateToDDMMYYYY(rawValue);
        if (!inputData.noUpdate) {
            inputData.value = rawValue;
            event.target.value = rawValue;
            inputData.hasError = false;
            setMessage(rawValue);
            onChange(inputData, index);
        } else {
            inputData.value = rawValue;
            event.target.value = rawValue;
            onChange(inputData, index);
        }
    };


    const renderType = () => {
        let input = <></>;
        switch (inputData.forceType ? inputData.forceType : inputData.type) {
            case "date":
                input = (
                    <section>
                        {inputData.hasTopLabel && (
                            <p className="top-label" style={{
                                color: theme.theme.textColor
                            }}>{t(inputData.label!)}</p>
                        )}
                        {inputData.extraLeftComponent}
                        <section className="bet">
                            <div
                                className={`arsa-input film-date ${inputData.hasError ? "round-error" : ""
                                    }`}

                                style={{
                                    borderColor: theme.theme.textColor,
                                    position: "relative"
                                }}
                            >
                                <input
                                    type={'text'}
                                    id={inputData.id}
                                    value={inputData.value ? inputData.value : null}
                                    placeholder={t(inputData.placeholder)}
                                    maxLength={inputData.maxLength ? inputData.maxLength : 100}
                                    onInput={handleChange}
                                    onFocus={(event) => {
                                        event.target.type = 'date';
                                        event.target.showPicker();
                                    }}
                                    onBlur={(e) => {
                                        e.target.type = "text";
                                        if (onBlur) {
                                            handleBlur(e);
                                        }
                                    }}
                                    style={{
                                        borderColor: theme.theme.textColor,
                                        position: "relative"
                                    }}
                                />
                            </div>
                        </section>
                    </section>
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
