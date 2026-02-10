import { CustomSwiper, Form, LayoutApp, LocalStorageEncryptService } from "common-lib";
import "./login.scss";
import { useLoginPresenter } from "./LoginPresenter";
/* export const const menuItems = [
    {
        label: t("sidemenu.profile"),
        icon: "account_circle",
        collapsed: false,
        extraClass: 'first-option menu-item-option',
        onClick: () => {
            router.push("/profile");
        },
    },
    {
        label: t("sidemenu.cards"),
        icon: "credit_card",
        collapsed: false,
        extraClass: 'menu-item-option',
        onClick: () => {
            router.push("/my-cards");
        },
    },
    {
        label: t("sidemenu.coupons"),
        icon: "loyalty",
        extraClass: 'menu-item-option loyal',
        collapsed: false,
        onClick: () => { },
    },
    {
        label: t("sidemenu.change-pass"),
        icon: "key",
        collapsed: false,
        onClick: () => { },
        extraClass: 'menu-item-option',
    },
    {
        label: t("sidemenu.terms"),
        icon: "contract",
        collapsed: false,
        onClick: () => { },
        extraClass: 'menu-item-option loyal',
    },
    {
        label: t("sidemenu.close-session"),
        icon: "logout",
        collapsed: false,
        extraClass: 'menu-item-option',
        onClick: () => {
            LocalStorageEncryptService.clearProperty("token", true)
            LocalStorageEncryptService.clearProperty("username", true)
            LocalStorageEncryptService.clearProperty("userSession", true)
            router.push("/login")
        },
    }
];
 */
export default function Login() {
    const { form, formRef, t, toggleForm, onSubmit, swiperData, goRegister, theme } = useLoginPresenter();

    return <section className="login">
            <CustomSwiper
                title="Destacados"
                subtitle="Nuestros productos estrella"
                hasTitle={false}
                hasPagination={true}
                hasArrow={false}
                hasScrollbar={false}
                loop={true}
                autoplay={false}
                slidesPerView={1}
                spaceBetween={10}

                cssClass="login-swiper"
            >
                {
                    swiperData.map(s => <div className="swiper-slide">
                        <div className="login-background">
                            <img src={s.img} alt="" />
                        </div>
                    </div>)
                }

            </CustomSwiper>

            <section className="form">

                <p className="title">{t("login.title")}</p>
                <p className="description">{t("login.description")}</p>
                <Form
                    data={form}
                    form={formRef}
                    hasAction={true}
                    buttonAction={onSubmit}
                    buttonDisable={false}
                    buttonText={t("login.login")}
                    extraClass={"about-form"}
                    onChangeForm={(e, index) => {
                    }}
                    onBlurForm={(e) => {
                        if (e.id == "password") {

                        }
                    }}
                ></Form>
                <p className="register">{t("login.not-account")}<span className="here" onClick={goRegister} style={{
                    color: theme.theme.primary
                }}> {t("login.here")}</span></p>
            </section>
        </section>
}
