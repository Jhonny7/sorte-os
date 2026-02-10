import { Chip } from "@/components/atoms/Chip/Chip"
import "./store-mini-card.scss"
import { Icon } from "common-lib"

export function StoreMiniCard({ img, title, time, kms, extraComponent }: any) {
    return <>
        <section className="store-mini-card">
            <div className="container-image">
                <img src={img} alt="" />
            </div>

            <div className="container-texts">
                <p>{title}</p>
                <div className="chips">
                    <Chip text={`${time}min.`} extraComponent={
                        <Icon name="av_timer" type="symbols" />
                    } />

                    <Chip text={`${kms}kms.`} extraComponent={
                        <Icon name="location_on" type="symbols" />
                    } />
                </div>
            </div>
        </section>
        {extraComponent}
    </>
}