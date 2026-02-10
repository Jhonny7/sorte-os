import "./user-type.scss"
import { useUserTypePresenter } from "./UserTypePresenter";

export default function UserType({ }) {

    const { data, t } = useUserTypePresenter();

    return <section className="user-type">
        <div className="inside">
            {
                data.map((cat: any) => {
                    return <div className="square">
                        <img src={cat.url} alt={cat.name} />
                        <p>{cat.name}</p>
                    </div>
                })
            }
        </div>
        {data && data?.length > 0 && <p className="msj">{t("choose.msj")}</p>}
    </section>
}