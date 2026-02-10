import React, { MouseEventHandler } from "react";
import "./button.scss";
import {angularize} from "react-in-angularjs";
import { useTheme } from "../../../context/ThemeContext";

export default function Button({
  extraClass = "",
  onClick = () => {},
  children,
  type,
  disabled=false
}: {
  extraClass?: string;
  onClick?: any;
  children?: any;
  type?: any;
  disabled?:boolean;

}) {
  const { theme } = useTheme();

  return (
    <button
      className={` animated fadeIn ${disabled ? 'disabled-style' : ''} ${type == 'outline' ? 'outline-style' : ''} ${extraClass} olm-btn`}
      onClick={onClick}
      style={{
        color: theme.textColorSecundary,
        backgroundColor: theme.primary,
      }}
      type={type ?? undefined}
    >
      {children}
    </button>
  );
}

export type ButtonProps = {
  extraClass?: string;
  type?: any;
  children?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};