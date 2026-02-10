import { useTranslation } from "react-i18next";
import "./restaurant-card.scss";
export default function RestaurantCard({ minPrice, hasCombos, img, title }) {
    const { t } = useTranslation();
    return <section className="restaurant-card">
        {
            hasCombos && <div className="combos">
                {t("home.combo")}
            </div>
        }
        <img src={img} alt={title} />
        <p className="title">{title}</p>

        <div className="price">
            <p>{t("home.from")}</p>
            <p>${minPrice}</p>
        </div>
    </section>
}