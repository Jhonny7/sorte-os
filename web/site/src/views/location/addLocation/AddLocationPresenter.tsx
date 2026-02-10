import { basePathUtilsCities, basePathUtilsCitiesByState, basePathUtilsPostalCode, basePathUtilsState, geoapi } from "@/environment/environment.prod";
import { httpService } from "@/services/HttpAppService";
import { InputCheckbox } from "common-lib";
import type { InputInterface } from "node_modules/common-lib/dist/types/Input.types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


export const FORM1 = [
    {
        type: "text",
        value: "",
        label: "location.place",
        placeholder: "Ej: Av. Los leones 4563",
        id: "street",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "toggle",
        value: false,
        label: "",
        placeholder: "location.nonum",
        id: "nonum",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    }, {
        type: "text",
        value: "",
        label: "location.postalcode",
        placeholder: "Ej: 09440",
        id: "cp",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "cp",
    }, {
        type: "special-select",
        value: "",
        label: "location.state",
        placeholder: "common.select",
        id: "state",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
        disabled: false
    }, {
        type: "select",
        value: "",
        label: "location.mun",
        placeholder: "common.select",
        id: "mun",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
        disabled: true
    }, {
        type: "select",
        value: "",
        label: "location.locality",
        placeholder: "common.select",
        id: "locality",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
        disabled: true
    }, {
        type: "select",
        value: "",
        label: "location.col",
        placeholder: "common.select",
        id: "col",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
        disabled: true
    }, {
        type: "text",
        value: "",
        label: "location.numint",
        placeholder: "Ej: 201",
        id: "numint",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    }, {
        type: "textarea",
        value: "",
        label: "location.about",
        placeholder: "Ej: Entre calles, color del edificio, no tiene timbre.",
        id: "about",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        value: "", // o [] si quieres múltiples
        values: [
            { value: "1", label: "No sé mi C.P" },
        ],
        type: "checkbox",
        placeholder: "",
        hasTopLabel: false,
        id: "extra-checkbox",
        extraClass: "checkbox-inside",
        globalExtraClass: "",
        required: false,
        checkboxMode: "toggle"
    }
];

export function useAddLocationPresenter() {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState<any>(FORM1);
    const formRef = useRef(new Date().getTime());
    const { t } = useTranslation();

    const [checkboxInputData, setCheckboxInputData] = useState<InputInterface>({
        value: "", // o [] si quieres múltiples
        values: [
            { value: "1", label: "No sé mi C.P" },
        ],
        type: "checkbox",
        placeholder: "",
        hasTopLabel: false,
        id: "extra-checkbox",
        extraClass: "checkbox-inside",
        globalExtraClass: "",
        required: false,
        checkboxMode: "toggle"
    });

    useEffect(() => {
        init();
        loadForm();
    }, [])

    function handleCheckboxChange(updatedInput: InputInterface, idx?: number) {
        setCheckboxInputData({ ...updatedInput });
        setForm((prev) => {
            const copy = [...prev];
            if (!copy[2]) return copy;
            copy[2].disabled = updatedInput.value == "1";
            if (updatedInput.value == "1") {
                copy[2].value = "";
                let valr: any = document.getElementById(copy[2].id);
                valr.value = '';
                copy[3].value = "";
                copy[3].disabled = true;
            } else {
                copy[3].disabled = false;
            }
            return copy;
        });
    }

    function handleCheckboxBlur(updatedInput: InputInterface, idx?: number) {
        console.log("checkbox blur", updatedInput);
    }

    function loadForm() {
        const formCopy = [...form];
        formCopy[2] = {
            ...formCopy[2],
            extraComponent: (
                <InputCheckbox
                    inputData={checkboxInputData}       // objeto aparte
                    index={2}
                    onChange={handleCheckboxChange}     // sincroniza con form[2]
                    onBlur={handleCheckboxBlur}
                />
            ),
        };

        setForm(formCopy);
    }

    async function init() {
        try {
            const res = await httpService.get(basePathUtilsState);

            if (res?.status && Array.isArray(res.data)) {
                const values = res.data.map((d: any) => ({
                    label: d.name,
                    value: d.name,
                }));

                setForm((prev: any[]) => {
                    const copy = [...prev];
                    const idx = 3;
                    if (copy[idx]) {
                        copy[idx] = { ...copy[idx], values };
                    }
                    return copy;
                });
            }
        } catch (error) {
            console.error("init error", error);
        }
    }

    async function findByPostalCode(input: InputInterface) {
        if (input.value && input.value?.length == 5) {
            try {

                const res = await httpService.get(`${geoapi.replace("[[]]", input.value)}`);
                console.log("res", res);

                if (Array.isArray(res.places)) {
                    let formCopy = [...form];
                    formCopy[3].value = res.places[0].state;
                    setForm(formCopy);
                    await getCities(res.places[0].state.toUpperCase());
                }
            } catch (error) {
                console.error("init error", error);
            }
        }
    }

    async function getCities(state: string = "") {
        try {
            const res = await httpService.get(basePathUtilsCitiesByState.replace("[[]]",state));
            console.log("cities", res);
        } catch (error) {
            console.error("getCities error", error);
        }
    }

    function onSubmit() {

    }

    return {
        scrollContainerRef,
        form,
        formRef,
        onSubmit,
        t,
        findByPostalCode
    }
}