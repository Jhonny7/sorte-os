// src/components/sidebar/Sidebar.tsx
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import './sidebar.scss'
import MenuItem from './../../../components/molecules/menu_item/MenuItem'
import { useTheme } from '../../../context/ThemeContext'
import LocalStorageEncryptService from './../../../services/LocalStorageEncrypt'
import { useTranslation } from 'react-i18next'
import AvatarInformation from '../../../components/molecules/avatar_information/AvatarInformation'

interface SidebarProps {
    collapsed: boolean
    toggle: () => void
    isMobile?: boolean
    flatMenu: Array<any>
    menuItems: Array<any>
}

interface MenuItemData {
    id: number
    name: string
    icon: string
    id_parent: number | null
    children?: MenuItemData[]
}

// Mock plano (como tabla de BD)
/* const flatMenu: MenuItemData[] = [
    { id: 1, name: "Dashboard", icon: "home", id_parent: null },
    { id: 2, name: "Analíticas", icon: "analytics", id_parent: null },
    { id: 3, name: "Clientes", icon: "group", id_parent: null },
    { id: 4, name: "Usuarios", icon: "person", id_parent: 3 },
    { id: 5, name: "Empresas", icon: "business", id_parent: 3 },
    { id: 6, name: "Reportes", icon: "list_alt", id_parent: null },
    { id: 7, name: "Ventas", icon: "bar_chart", id_parent: 6 },
    { id: 8, name: "Resumen", icon: "summarize", id_parent: 7 },
]*/

function buildMenuTree(items: MenuItemData[], parentId: number | null = null,): MenuItemData[] {
    return items?.length > 0 ? items
        .filter(item => item.id_parent === parentId)
        .map(item => ({
            ...item,
            children: buildMenuTree(items, item.id)
        })) : []
}

export default function Sidebar({ collapsed, toggle, flatMenu, menuItems }: SidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(true)
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
    const treeMenu = buildMenuTree(flatMenu)
    const { theme } = useTheme();
    const toggleExpanded = (id: number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev)
            newSet.has(id) ? newSet.delete(id) : newSet.add(id)
            return newSet
        })
    }

    const renderMenu = (items: MenuItemData[]): any[] => {
        return items.map(item => {
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.has(item.id)

            return (
                <div key={item.id} className="menu-branch">
                    <MenuItem
                        item={{
                            label: item.name,
                            icon: item.icon,
                            collapsed,
                            onClick: () => {
                                if (hasChildren) toggleExpanded(item.id)
                                else console.log(`Navigating to ${item.name}`)
                            },
                        }}
                        arrow={
                            hasChildren
                                ? isExpanded
                                    ? "keyboard_control_key"
                                    : "keyboard_arrow_down"
                                : undefined
                        }
                    />

                    <div
                        className={`menu-children ${isExpanded ? "open" : ""}`}
                        style={{
                            maxHeight: isExpanded ? "500px" : "0px",
                        }}
                    >
                        {renderMenu(item.children ?? [])}
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        /* const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile) */
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isMobile &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node) &&
                !collapsed
            ) {
                toggle()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [collapsed, toggle, isMobile])

    return (
        <aside
            ref={sidebarRef}
            className={`${classNames('as-sidebar', {
            })} mobile collapsed ${!collapsed && isMobile ? 'open' : 'closee'}`}
        >
            <div className={classNames('logo', {
                'collapsed-logo': collapsed
            })} onClick={toggle} style={{
                backgroundColor: theme.primary
            }}>
                <span><img src="/logo.png" alt="Portales" className='portales-desktop' /></span>
            </div>

            <div className='hidden-button' onClick={toggle} id='toggle'>

            </div>

            <div className='options'>
                {
                    (() => {
                        try {
                            let profile = LocalStorageEncryptService.getFromLocalStorage("userSession", true)
                            return <AvatarInformation name={`${profile.name} ${profile.lastName}`} additionalInformation={`${profile.name} ${profile.lastName}`} subadditionalInformation={profile.email} />
                        } catch (error) {
                            return null;
                        }
                    })()
                }
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={item.label}
                        item={{
                            label: item.label,
                            icon: item.icon,
                            collapsed: false,
                            extraClass: item.extraClass,
                            onClick: item.onClick,
                        }}
                    />
                ))}
            </div>
        </aside>
    )
}
