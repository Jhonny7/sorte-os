import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function LocationsPresenter() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  return {
    t,
    i18n,
    navigate,
    location,
  };
}
