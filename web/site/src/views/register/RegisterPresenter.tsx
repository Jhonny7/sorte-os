"use client";
import { useTheme } from "common-lib";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const REGISTER_FORM = [
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
        type: "password",
        value: null,
        label: "register.form.field5",
        placeholder: "register.form.field5-placeholder",
        id: "field5",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: null,
        label: "register.form.field6",
        placeholder: "register.form.field6-placeholder",
        id: "field6",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
];

export function useRegisterPresenter() {
    const {theme}: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>(REGISTER_FORM);
    const navigate = useNavigate();

    async function onSubmit() {

    }

    function goOTP() {
        navigate("/otp");
    }

    return {
        form,
        formRef,
        t,
        onSubmit,
        goOTP,
        theme
    };
}