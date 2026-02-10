import "./content.scss";

export default function Content({ children, extraClass = "", ref = null }: { children: any, extraClass: string, ref:any }) {
    return <section className={`content ${extraClass}`} ref={ref}>
        {children}
    </section>
}