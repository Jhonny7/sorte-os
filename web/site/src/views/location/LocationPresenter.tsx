import { useTheme } from "common-lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function useLocationPresenter() {

    const { theme }: any = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();

    return {
        t,
        navigate
    }
}