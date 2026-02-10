import './icon.scss'

interface IconProps {
  type?: '' | 'outlined' | 'round' | 'symbols'
  name: string
}

export default function Icon({ type = 'outlined', name }: IconProps) {
  const classMap = {
    '': 'material-icons',
    'outlined': 'material-icons-outlined',
    'round': 'material-icons-round',
    'symbols': 'material-symbols-outlined',
  } as const

  return <span className={classMap[type]}>{name}</span>
}

