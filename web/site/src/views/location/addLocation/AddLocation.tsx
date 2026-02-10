import { Content, Form } from "common-lib"
import "./addLocation.scss"
import { useAddLocationPresenter } from "./AddLocationPresenter";

export default function AddLocation({ }) {
    const { scrollContainerRef, form, formRef, onSubmit, t, findByPostalCode } = useAddLocationPresenter();
    return <Content extraClass="add-location" ref={scrollContainerRef}>
        <Form
            data={form}
            form={formRef}
            hasAction={false}
            buttonAction={onSubmit}
            buttonDisable={false}
            buttonText={t("common.save")}
            extraClass={"location-form"}
            onChangeForm={(e, index) => {
                console.log(e);
                if (e.id = 'cp') {
                    findByPostalCode(e);
                }
            }}
            onBlurForm={(e, index) => { }}
        />
    </Content>
}