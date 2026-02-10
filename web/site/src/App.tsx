import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import { LayoutApp, LocalStorageEncryptService, useTheme } from "common-lib";
import { useTranslation } from "react-i18next";
import React, { useMemo } from "react";
import Tabs from "./components/molecules/tabs/Tabs";

export default function App() {
  const { theme } = useTheme();
  const routing = useRoutes(appRoutes);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { t } = useTranslation();

  const backActiveScreens = ["/register", "/faqs", "/privacy", "/addresses", "/addresses/add"];

  const menuItems = [
    {
      label: t("sidemenu.profile"),
      icon: "account_circle",
      collapsed: false,
      extraClass: 'first-option menu-item-option',
      onClick: () => {
        navigate("/profile");
        try {
          document.getElementById("toggle")?.click();
        } catch { }
      },
    },
    {
      label: t("sidemenu.my-orders"),
      icon: "moped",
      collapsed: false,
      extraClass: 'menu-item-option',
      onClick: () => {
        navigate("/my-orders");
      },
    },
    {
      label: t("sidemenu.addresses"),
      icon: "distance",
      extraClass: 'menu-item-option loyal',
      collapsed: false,
      onClick: () => { 
        navigate("/addresses");
         try {
          document.getElementById("toggle")?.click();
        } catch { }
      },
    },
    {
      label: t("sidemenu.contact"),
      icon: "call",
      collapsed: false,
      onClick: () => { },
      extraClass: 'menu-item-option',
    },
    {
      label: t("sidemenu.shared"),
      icon: "share",
      collapsed: false,
      onClick: () => { },
      extraClass: 'menu-item-option loyal',
    },
    {
      label: t("sidemenu.support"),
      icon: "3p",
      collapsed: false,
      onClick: () => { },
      extraClass: 'menu-item-option ',
    },
    {
      label: t("sidemenu.privacy"),
      icon: "gpp_maybe",
      collapsed: false,
      onClick: () => {
        navigate("/privacy");
        try {
          document.getElementById("toggle")?.click();
        } catch { }
      },
      extraClass: 'menu-item-option ',
    },
    {
      label: t("sidemenu.FAQS"),
      icon: "live_help",
      collapsed: false,
      onClick: () => {
        navigate("/faqs");
        try {
          document.getElementById("toggle")?.click();
        } catch { }
      },
      extraClass: 'menu-item-option loyal',
    },
    {
      label: t("sidemenu.close-session"),
      icon: "logout",
      collapsed: false,
      extraClass: 'menu-item-option',
      onClick: () => {
        LocalStorageEncryptService.clearProperty("token", true);
        LocalStorageEncryptService.clearProperty("username", true);
        LocalStorageEncryptService.clearProperty("userSession", true);
        navigate("/login");
      },
    },
  ];

  const barItems = useMemo(() => {
  return LocalStorageEncryptService.getFromLocalStorage("userSession", true)
    ? [
        { id: "search", icon: "search", onClick: () => {
          navigate("/search-advanced")
        } },
        { id: "profile", icon: "account_circle", onClick: () => {} },
      ]
    : [];
}, [location]);

  const backActive = backActiveScreens.includes(location.pathname);
  const inactiveTabsScreensArray = ["/login", "/register", "/faqs", "/privacy"];
  const inactiveTabsScreens = inactiveTabsScreensArray.includes(location.pathname);

  const tabs = [{
    icon: "store",
    link: "home"
  },{
    icon: "search",
    link: "advanced-search"
  },{
    icon: "shopping_cart",
    link: "shopping"
  },{
    icon: "person_alert",
    link: "profile"
  }];

  return (
    <LayoutApp
      logoSrc={theme.logo}
      menuItems={menuItems}
      backActive={backActive}
      barItems={barItems}
      hideMenu={barItems.length<=0}
    >
      {routing}
      <Tabs active={!inactiveTabsScreens} tabs={tabs}/>
    </LayoutApp>
  );
}
