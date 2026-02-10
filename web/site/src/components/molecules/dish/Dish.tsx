import { Icon } from "common-lib";
import "./dish.scss";
export default function Dish({ price, offerPrice, img, title }) {
    return <section className="dish-card">
        <img src={img} alt={title} />

        <div className="price">
            <p>{title}</p>
            <p><span className={`${offerPrice && offerPrice?.toString()?.length > 0 ? 'back-price' : ''}`}>${price}</span> {offerPrice && offerPrice?.toString()?.length > 0 && <span>${offerPrice}</span>}</p>
        </div>

        {
            offerPrice && offerPrice?.toString()?.length > 0 && <div className="offers">
                <Icon name="sell" type="symbols"/>
            </div>
        }
    </section>
}