import "./Chip.scss";

export type ChipProps = {
  text: string;
  extraClass?: string;
  active?: boolean;
  id?: string;
  onClick?: (id?: string, event?: React.MouseEvent<HTMLDivElement>) => void;
  extraComponent?: any;
};

export function Chip({
  text,
  extraClass,
  active,
  id,
  onClick,
  extraComponent
}: ChipProps) {
  return <div
    id={id}
    className={`chip ${active ? 'chipActive' : 'chipNoActive'} ${extraClass ?? ''}`}
    onClick={(e) => {
      onClick?.(id, e);

    }}>
    {extraComponent}
    <span className={'pill'}>{text}</span>
  </div>
}