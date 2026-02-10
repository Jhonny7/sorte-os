import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

import { useDeviceDetect, useTheme } from "common-lib";

export function useProfilePresenter() {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());

    function onSubmit() {

    }

    function cancelAccount() {

    }

    return {
        formRef, t, onSubmit, cancelAccount
    };
}
