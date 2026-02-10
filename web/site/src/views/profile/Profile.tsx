"use client";
import { Avatar, Button, Form, LayoutApp, LocalStorageEncryptService } from "common-lib";
import "./profile.scss";
import { useProfilePresenter } from "./ProfilePresenter";

export default function Profile() {
    const { form, formRef, t, onSubmit, cancelAccount } = useProfilePresenter();

    return <LayoutApp>
        <section className="profile">
            <p className="title">{t('profile.title')}</p>

            <div className="square-container">
                <Avatar name="Diana Irma" />

                {(() => {
                    try {
                        let profile = LocalStorageEncryptService.getFromLocalStorage("userProfile", true)
                        return <Avatar name={`${profile.name} ${profile.lastname}`} />
                    } catch (error) {
                        return null;
                    }
                })()}

                <div className="design">

                </div>
                <Form
                    data={form}
                    form={formRef}
                    hasAction={true}
                    buttonAction={onSubmit}
                    buttonDisable={false}
                    buttonText={t("common.save")}
                    extraClass={"about-form"}
                    onChangeForm={(e, index) => {
                    }}
                    onBlurForm={(e, index) => {
                    }}
                />

            </div>

            <Button type='outline' extraClass="cancel-button" onClick={cancelAccount}>{t("profile.delete")}</Button>
        </section>
    </LayoutApp>
}
