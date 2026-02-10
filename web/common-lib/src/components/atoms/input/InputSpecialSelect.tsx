import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "./../../../context/ThemeContext";
import { InputInterface } from "../../../types/Input.types";
import { useTranslation } from "react-i18next";

type Option = { value: any; label: string };

type Props = {
    inputData: InputInterface;
    index: number;
    onChange: Function;
    onBlur: Function;
};

export default function InputSpecialSelect({ inputData, index, onChange, onBlur }: Props) {
    const theme: any = useTheme();
    const { t } = useTranslation();
const [inputEnter, setMessage] = useState("");
    const options = (inputData.values ?? []) as Option[];
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [highlightIdx, setHighlightIdx] = useState<number>(-1);
    const [localValue, setLocalValue] = useState<any>(inputData.value ?? "");
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    // Sync external value -> local
    useEffect(() => {
        setLocalValue(inputData.value ?? "");
    }, [inputData.value]);

    // Filtered options
    const filtered = useMemo(() => {
        if (!inputData.hasSearch || !searchTerm) return options;
        const term = searchTerm.toLowerCase();
        return options.filter((o) => (o.label ?? "").toString().toLowerCase().includes(term) || (String(o.value) ?? "").toLowerCase().includes(term));
    }, [options, searchTerm, inputData.hasSearch]);

    // Close on outside click
    useEffect(() => {
        function onDocClick(ev: MouseEvent) {
            if (open && wrapperRef.current && !wrapperRef.current.contains(ev.target as Node)) {
                closeDropdown(true);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    // Helpers
    const getLabelForValue = (val: any) => {
        const found = options.find((o) => o.value === val || String(o.value) === String(val));
        return found ? found.label : "";
    };

    const openDropdown = () => {
        if (inputData.disabled) return;
        setOpen(true);
        setTimeout(() => {
            if (inputData.hasSearch) searchRef.current?.focus();
            else listRef.current?.focus();
        }, 0);
    };

    const closeDropdown = (triggerBlur = false) => {
        setOpen(false);
        setSearchTerm("");
        setHighlightIdx(-1);
    };

    const selectOption = (opt: Option) => {
        const parsed = opt.value;
        console.log(parsed);
        inputData.value = opt.value;
        inputData.hasError = false;
        setMessage(parsed);
        onChange(inputData, index);
        
        closeDropdown(true);
    };

    // keyboard handling
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (inputData.disabled) return;
        if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openDropdown();
            return;
        }
        if (open) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIdx((h) => Math.min(h + 1, filtered.length - 1));
                scrollToHighlighted(highlightIdx + 1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIdx((h) => Math.max(h - 1, 0));
                scrollToHighlighted(highlightIdx - 1);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const sel = filtered[highlightIdx >= 0 ? highlightIdx : 0];
                if (sel) selectOption(sel);
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeDropdown(true);
            }
        }
    };

    const scrollToHighlighted = (idx: number) => {
        const list = listRef.current;
        if (!list || idx < 0) return;
        const child = list.querySelectorAll(".ss-option")[idx] as HTMLElement | undefined;
        if (child) {
            const top = child.offsetTop;
            const bottom = top + child.offsetHeight;
            if (top < list.scrollTop) list.scrollTop = top;
            else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
        }
    };

    return (
        <section className={`${inputData.globalExtraClass ?? ""} ${inputData.extraClass ?? ""} gp-form input-special-select`}>
            {inputData.hasTopLabel && (
                <p className="top-label" style={{ color: theme.theme.textColor }}>
                    {t(inputData.label ?? "")}
                </p>
            )}

            <div
                ref={wrapperRef}
                className={`ss-wrapper ${open ? "open" : ""} ${inputData.hasError ? "round-error" : ""} ${inputData.disabled ? "disabled" : ""}`}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                tabIndex={0}
            >
                {inputData.extraLeftComponent}

                <button
                    type="button"
                    className="ss-control"
                    onClick={() => (open ? closeDropdown(true) : openDropdown())}
                    aria-label={t(inputData.placeholder ?? "")}
                    disabled={!!inputData.disabled}
                    style={{ borderColor: theme.theme.textColor }}
                >
                    <span className="ss-value">{localValue !== "" && localValue !== null ? getLabelForValue(localValue) : (inputData.hasPlaceholder !== false ? t(inputData.placeholder ?? "") : "")}</span>
                    <span className={`ss-caret ${open ? "up" : "down"}`} />
                </button>

                <div className="ss-dropdown" style={{ display: open ? "block" : "none" }}>
                    {inputData.hasSearch && (
                        <div className="ss-search-wrapper">
                            <input
                                ref={searchRef}
                                className="ss-search"
                                placeholder={t(inputData.placeholder ?? "")}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setHighlightIdx(0);
                                }}
                                disabled={!!inputData.disabled}
                                aria-label={t("search")}
                            />
                        </div>
                    )}

                    <div className="ss-list" role="listbox" ref={listRef} tabIndex={-1}>
                        {filtered.length === 0 ? (
                            <div className="ss-empty">{t("No results")}</div>
                        ) : (
                            filtered.map((opt, i) => {
                                const selected = localValue !== "" && (opt.value === localValue || String(opt.value) === String(localValue));
                                const highlighted = i === highlightIdx;
                                return (
                                    <div
                                        key={i}
                                        role="option"
                                        aria-selected={selected}
                                        className={`ss-option ${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""}`}
                                        onMouseEnter={() => setHighlightIdx(i)}
                                        onClick={() => selectOption(opt)}
                                    >
                                        <span className="ss-opt-label">{t(opt.label ?? String(opt.value))}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {inputData.extraComponent}
                </div>
            </div>

            {inputData.required && inputData.hasError && <p className="error">{inputData.errorMessage}</p>}
        </section>
    );
}
