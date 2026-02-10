import { useEffect, useState, type ReactNode } from 'react'
import './layout.scss'
import HeaderApp, { NavButtonProps } from '../headerApp/HeaderApp'
import SidebarApp from '../sidebarApp/SidebarApp'

interface LayoutProps {
    children?: ReactNode
    hideHeader?: boolean
    hideMenu?: boolean
    flatMenu?: Array<any>
    logoSrc?: string,
    backActive?: boolean,
    menuItems?: Array<any>
    barItems?: Array<any>
    extraClass?:string
}

export default function LayoutApp({ children, hideHeader = false, flatMenu = [], logoSrc, backActive, menuItems = [], barItems= [], extraClass,hideMenu = false}: LayoutProps) {

    const [collapsed, setCollapsed] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleClickContent = () => {
        if (isMobile && collapsed === false) {
            setCollapsed(true)
        }
    }

    const menuButton: NavButtonProps = {
        name: "menu",
        type: "round",
        className: "nav-button",
        onClick: () => {
            console.log("click open menu");

            setCollapsed(!collapsed)
        },
    };

    return <section className={`as-layout ${extraClass ?? ''}`}>
        <SidebarApp
            collapsed={collapsed}
           toggle={() => setCollapsed(!collapsed)}
            isMobile={isMobile}
            flatMenu={flatMenu}
            menuItems={menuItems}
        />
        <div className="main-area">
            {!hideHeader && <HeaderApp logoSrc={logoSrc} items={barItems} nav_button={menuButton} isMobile={isMobile} backActive={backActive} hideMenu={hideMenu}/>}
            <main className={`main-content ${!collapsed && isMobile ? 'apply-opacity' : ''}`}>
                <div>
                    {children}
                    {!collapsed && isMobile && <div className='hide-opacity'></div>}
                </div>
            </main>
        </div>
    </section>
}