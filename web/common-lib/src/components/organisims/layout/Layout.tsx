import { useEffect, useState, type ReactNode } from 'react'
import Header from './../../..//components/organisims/header/Header'
import './layout.scss'
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'

interface LayoutProps {
    children?: ReactNode
    hideHeader?: boolean
    flatMenu: Array<any>
}

export default function Layout({ children, hideHeader = false, flatMenu }: LayoutProps) {

    const [collapsed, setCollapsed] = useState(false)
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

    return <section className="as-layout">
        <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} isMobile={isMobile} flatMenu={flatMenu}/>
        <div className="main-area">
            {!hideHeader && <Header isMobile={isMobile} onClickOpenMenu={() => {
                setCollapsed(false) // mostrar menú
            }} />}
            <main className={`main-content ${!collapsed && isMobile ? 'apply-opacity' : ''}`}>
                <div>
                    {children ? children : <Outlet />}
                    {!collapsed && isMobile && <div className='hide-opacity'></div>}
                </div>
            </main>
        </div>
    </section>
}