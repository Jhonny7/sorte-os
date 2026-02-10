import Icon from "../../atoms/icon/Icon"
import "./menu-item.scss"

interface Item {
  label: string
  onClick?: () => void
  icon?: string
  collapsed?: boolean,
  extraClass?: string
}

export default function MenuItem({ item, arrow }: { item: Item; arrow?: string }) {
  const hasIcon = typeof item.icon === "string" && item.icon.length > 0

  return (
    <button className={`menu-item ${item.extraClass ?? ''}`} onClick={() => item.onClick?.()}>
      <div className="left">
        {hasIcon && <Icon name={item.icon!} type="symbols" />}
        {!item.collapsed && <span className="label-menu">{item.label}</span>}
      </div>
      {!item.collapsed && arrow && <Icon name={arrow} />}
    </button>
  )
}