import { Icon } from "common-lib";
import "./fab-button.scss";

export function FabButton({ icon, action, extraClass = '' }) {
    return <section className={`fab ${extraClass ?? ''}`} onClick={action}>
        <Icon name={icon} />
    </section>
}