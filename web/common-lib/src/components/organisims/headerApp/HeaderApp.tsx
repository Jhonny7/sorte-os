import { useNavigate } from "react-router-dom";
import Icon from "./../../../components/atoms/icon/Icon";
import { useTheme } from "./../../../context/ThemeContext";
import "./header.scss";
import { useEffect, useMemo, useState } from "react";

export interface NavButtonProps {
  name: string;
  type?: "" | "outlined" | "round";
  className?: string;
  onClick?: () => void;
};

export interface HeaderProps {
  nav_button: {
    name: string;
    type?: "" | "outlined" | "round";
    className?: string;
    onClick?: Function;
  };
  logoSrc?: string;
  items: {
    id: string;
    icon: string;
    onClick: () => void;
  }[];
  isMobile?: boolean;
  backActive?: boolean;
  hideMenu?:boolean;
}

export default function HeaderApp({ logoSrc, items, nav_button, isMobile = true, backActive = false, hideMenu=false}: HeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("userSession");
    setUserSession(raw ? JSON.parse(raw) : null);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "userSession") {
        setUserSession(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header
      className="header flex"
      style={{ backgroundColor: theme.theme.primary }}
    >
      {backActive ? <button onClick={() => {
        navigate(-1)
      }} className="nav-button">
        <Icon name={'arrow_back_ios'}></Icon>
      </button> : (
        hideMenu ? null : (
          <button
            onClick={() => {
              console.log("navBtn", nav_button);
              if (nav_button.onClick) {
                nav_button.onClick();
              }
            }}
            className={nav_button.className}
          >
            <Icon name={nav_button.name} type={nav_button.type} />
          </button>
        )
      )}
      <div className="top-center">
        <img src={logoSrc} alt={logoSrc} />
      </div>
      <div className="top-right">
        {items.map((item) => (
          <button key={item.id} onClick={item.onClick} className="nav-button">
            <Icon name={item.icon} />
          </button>
        ))}
      </div>
    </header>
  );
}
