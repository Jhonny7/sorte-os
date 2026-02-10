import { Button, Icon } from "common-lib";
import "./locations.scss";
import LocationElement from "./location-element/location-element";
import { useEffect, useState } from "react";
import LocationsPresenter from "./LocationsPresenter";

export default function Location() {
  const { t, navigate } = LocationsPresenter();
  interface AddressProps {
    id: number;
    address: string;
    number: string;
    name: string;
    references: string;
    type: string;
  }

  const savedlocation: AddressProps = JSON.parse(
    localStorage.getItem("location") || "{}"
    //direccion guardada, la ""predeterminada"" que se muestra al inicio
  );
  const realLocation = Object.keys(savedlocation).length === 0 ? false : true;
  const [location, setLocation] = useState(savedlocation.address);
  const [locations, setLocations] = useState<AddressProps[]>([]);

  const deleteLocation = (id: number) => {
    const savedLocations = JSON.parse(
      localStorage.getItem("my-address") || "[]"
    );
    const updatedLocations = savedLocations.filter(
      (loc: AddressProps) => loc.id !== id
    );

    setLocations(updatedLocations);
    localStorage.setItem("my-address", JSON.stringify(updatedLocations));
  };

  const selectLocation = (selectedLocation: AddressProps) => {
    setLocation(selectedLocation.address);
    localStorage.setItem("location", JSON.stringify(selectedLocation));
    // para cambiar la dirección seleccionada (la dirección que se muestra en la parte superior)
  };

  const editLocation = (id: number, updatedLocation: AddressProps) => {
    setLocations((prevLocations) =>
      prevLocations.map((loc) => (loc.id === id ? updatedLocation : loc))
    );
  };

  useEffect(() => {
    const savedLocations = JSON.parse(
      localStorage.getItem("my-address") || "[]"
    );
    setLocations(savedLocations);
  }, []);

  return (
    <div className="location-container">
      <div className="location-title">
        <span>
          <Icon name="close" />
        </span>
        <h1 className="my-title">{t("locations.title")}</h1>
      </div>
      <div className="mylocation">
        <div className="icon-house">
          <Icon name="location_on" type="outlined" />
        </div>
        <div className="element">
          <p className="near">{t("locations.near_you")}</p>
          <p>{location}</p>
          {!realLocation && (
            <p>{t("locations.real_time_disabled")}</p>
          )}
          <Button extraClass="update-button">{t("locations.update")}</Button>
        </div>
        <div className="actions">
          <Icon name="arrow_forward_ios" type="round" />
        </div>
      </div>
      <div className="saved-locations">
        <h3>{t("locations.saved_locations")}</h3>
        <LocationElement
          lista={locations}
          onSelect={selectLocation}
          onDelete={(id) => deleteLocation(id)}
        />
      </div>
      <div className="add-location">
        <Button
          extraClass="add-location-button"
          onClick={() => {
            
            navigate("/select-location");
          }}
        >
          <Icon name="add" type="round" />
          <p>{t("locations.add_location")}</p>
        </Button>
      </div>
    </div>
  );
}
