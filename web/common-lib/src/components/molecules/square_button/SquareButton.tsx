import "./square-button.scss";

export default function SquareButton({ children, onClick, extraClass }: { children: any, onClick?: Function, extraClass?:string }) {
    return <div className={`capsule-square ${extraClass ?? ''}`} onClick={() => {
        if (onClick) {
            onClick!();
        }
    }}>
        {children}
    </div>
}