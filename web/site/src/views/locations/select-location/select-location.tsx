import { Button, Icon } from "common-lib";
import "./select-location.scss";
import LocationsPresenter from "../LocationsPresenter";

export default function SelectLocation() {
  const { t, navigate } = LocationsPresenter();
  return (
    <div className="select-location-container">
      <div className="select-location-header">
        <span
          onClick={() => navigate(-1)}
          className="select-location-back-button"
        >
          <Icon name="arrow_back_ios" />
        </span>
        <h1>{t("locations.select.title")}</h1>
      </div>
      <div className="select-location-buttons">
        <Button
          extraClass="buttons"
          onClick={() => navigate("/current-location")}
        >
          <div className="button">
            {t("locations.select.current_location")} <Icon name="location_on" />
          </div>
        </Button>
        <Button extraClass="buttons" onClick={() => navigate("/add-location")}>
          <div className="button">
            {t("locations.select.manual_location")} <Icon name="location_off" />
          </div>
        </Button>
      </div>
    </div>
  );
}
