import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

import { useDeviceDetect, useTheme } from "common-lib";

export const PROFILE_FORM = [
    {
        type: "text",
        value: null,
        label: "register.form.field1",
        placeholder: "register.form.field1-placeholder",
        id: "field1",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: null,
        label: "register.form.field2",
        placeholder: "register.form.field2-placeholder",
        id: "field2",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "phone",
        value: null,
        label: "register.form.field3",
        placeholder: "register.form.field3-placeholder",
        id: "field3",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        maxLength: 10,
        globalExtraClass: "register-input",
    },
    {
        type: "date",
        value: null,
        label: "register.form.field4",
        placeholder: "register.form.field4-placeholder",
        id: "field4",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "phone",
        value: "",
        label: "profile.form.field5",
        placeholder: "profile.form.field5-placeholder",
        id: "field5",
        required: true,
        maxLength: 5,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "checkbox",
        value: "",
        label: "profile.form.field6",
        placeholder: "profile.form.field6-placeholder",
        id: "field6",
        required: true,
        maxLength: 5,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
        values: [{
            value: "M",
            label: "profile.form.field6-placeholder"
        }, {
            value: "H",
            label: "profile.form.field7-placeholder"
        }]
    },
];

export function useProfilePresenter() {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>(PROFILE_FORM);

    function onSubmit() {

    }

    function cancelAccount() {

    }

    return {
        form, formRef, t, onSubmit, cancelAccount
    };
}
