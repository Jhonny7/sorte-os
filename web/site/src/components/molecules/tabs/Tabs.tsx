import { Icon } from "common-lib";
import { useLocation, useNavigate } from "react-router-dom";
import "./tabs.scss";

export default function Tabs({ active, tabs = [] }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!active) return null;

  return (
    <section className="tabs-modern">
      {tabs.map((tab: any, i: number) => {
        const isActive = location.pathname.includes(tab.link);

        return (
          <div
            key={i}
            className={`tab-modern ${isActive ? "tab-active" : ""}`}
            onClick={() => navigate(tab.link)}
          >
            <div className="tab-icon-wrapper">
              <Icon name={tab.icon} type="symbols"/>
            </div>
          </div>
        );
      })}
    </section>
  );
}
