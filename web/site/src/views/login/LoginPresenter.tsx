import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

import { environment } from "@/environment/environment.prod";
import { httpService } from "@/services/HttpAppService";
import { AlertService, LoadingService, LocalStorageEncryptService, useDeviceDetect, useTheme, useUserSession } from "common-lib";
import { useNavigate } from "react-router-dom";

export function useLoginPresenter() {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>([]);

    const session = useUserSession();
    const navigate = useNavigate();

    const [swiperData, setSwiperData] = useState<any>([
        {
            img: "/login/ban1.png"
        },
        {
            img: "/login/ban2.png"
        },
        {
            img: "/login/ban3.png"
        }
    ]);

    useEffect(() => {
        if (LocalStorageEncryptService.getFromLocalStorage("userSession", true)) {
            //Enviar a pantalla home 
        }

        setForm([
            {
                type: "text",
                value: null,
                label: "login.username",
                placeholder: "Número celular",
                id: "subjectf",
                required: true,
                hasTopLabel: true,
                hasError: false,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>

                        <span className="material-symbols-outlined" style={{
                            color: theme.theme.primary
                        }}>mobile</span>
                    </div>
                ),
            },
            {
                type: "password",
                value: null,
                label: "login.password",
                placeholder: "Contraseña",
                required: true,
                id: "subjectf2",
                hasTopLabel: true,
                hasError: false,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                hasEye: false,
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>
                        <span className="material-icons-outlined" style={{
                            color: theme.theme.primary
                        }}>key</span>
                    </div>
                ),
                extraComponent: (
                    <div className="custom-icon-right" style={{
                        background: theme.theme.color
                    }} onClick={() => togglePassword()} id="eye1">
                        <span className="material-symbols-outlined" style={{
                            color: theme.theme.primary
                        }}>visibility</span>
                    </div>
                ),
            },
        ]);


    }, [theme]);

    function togglePassword() {
        console.log("togglePassword");

        let eye = document.getElementById("eye1");
        let pass: any = document.getElementById("subjectf2");
        if (eye && pass) {
            if (eye.children[0].innerHTML === 'visibility') {
                eye.children[0].innerHTML = 'visibility_off';
                pass.type = 'text';
            } else {
                eye.children[0].innerHTML = 'visibility';
                pass.type = 'password';
            }
        }
    }

    function toggleForm() {
        const container: any = document.querySelector(".container");
        if (container) container.classList.toggle("active");
    }

    async function onSubmit() {
        console.log("click");
        console.log(form);
        let loginForm = [...form]
        let errors: number = 0;
        let updatedForm = form.map((item: any) => {
            console.log(item);

            if (!item.value || item.value.length <= 0) {
                return { ...item, hasError: true, errorMessage: t("errors.required") };
            }
            return { ...item, hasError: false };
        });
        console.log(loginForm);

        setForm(updatedForm)
        if (errors == 0) {
            let request = {
                username: loginForm[0].value,
                password: loginForm[1].value
            };
            LoadingService.show()
            let response: any = await httpService.post(environment.login, request);

            const res = await httpService.post(environment.tokenPath, {
                username: loginForm[0].value,
                password: loginForm[1].value
            });
            if (res.data) {
                let token: any = res.data.token;
                LocalStorageEncryptService.setToLocalStorage("token", token, true)
            }

            if (response.code != 200) {
                console.log("alert");
                console.log(response);
                AlertService.toast({
                    message: response.message,
                    durationMs: 3000, // 3 segundos
                    position: 'bottom-end', // esquina inferior derecha
                    level: 'warn'
                });
            } else {
                AlertService.toast({
                    message: `Bienvenido ${response.data.name}`,
                    durationMs: 3000, // 3 segundos
                    position: 'bottom-end', // esquina inferior derecha
                    level: 'success'
                });
                response.data.addition = btoa(loginForm[1].value)
                LocalStorageEncryptService.setToLocalStorage("userSession", response.data, true)

                navigate("/home");
            }
            LoadingService.hide()
        }
    }

    function goRegister() {
        navigate("/register")
    }

    return {
        form,
        formRef,
        t,
        toggleForm,
        onSubmit,
        swiperData,
        goRegister,
        theme
    };
}
