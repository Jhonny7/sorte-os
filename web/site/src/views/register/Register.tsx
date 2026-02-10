"use client";

import { Content, Form } from "common-lib";
import { useRegisterPresenter } from "./RegisterPresenter";


export default function Register() {
    const { form, formRef, t, onSubmit, goOTP, theme } = useRegisterPresenter();

    return <Content extraClass="register">
            <p className="title">{t("register.title")}</p>
            <p className="description">{t("register.description")}</p>
            <Form
                data={form}
                form={formRef}
                hasAction={true}
                buttonAction={goOTP}
                buttonText={t("register.register")}
                extraClass={"about-form"}
                onChangeForm={(e, index) => {
                    console.log(e);
                    console.log(index);

                }}
                onBlurForm={(e) => {
                    if (e.id = "password") {

                    }
                }}
            ></Form>
        </Content>;
}