import { useTranslation } from "react-i18next";
import "./category.scss";
export default function Category({ icon, title }) {
    const { t } = useTranslation();
    return <section className="category">
        <div>
            <img src={icon} alt={title} />
        </div>
        <p>{t(title)}</p>
    </section>
}