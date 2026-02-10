import { Icon } from "common-lib";
import "./location-element.scss";
import LocationsPresenter from "../LocationsPresenter";

interface AddressProps {
  id: number;
  address: string;
  number: string;
  name: string;
  references: string;
  type: string;
}

interface LocationProps {
  lista: AddressProps[];
  onDelete: (id: number) => void;
  onSelect: (location: AddressProps) => void;
}

export default function LocationElement({
  lista,
  onDelete,
  onSelect,
}: LocationProps) {
  const { t } = LocationsPresenter();
  return (
    <div className="location-element">
      {lista.map((item) => (
        <div className="locations" key={item.id}>
          <div className="icon-house">
            <Icon
              name={
                item.type === t("locations.types.default")
                  ? "location_on"
                  : item.type === t("locations.types.house")
                  ? "home"
                  : item.type === t("locations.types.building")
                  ? "apartment"
                  : "domain"
              }
              type="outlined"
            />
          </div>
          <div className="elements">
            <p className="">{item.name}</p>
            <p>{item.address}</p>
            <p className="references">{item.references}</p>
          </div>
          <div className="actions">
            <span className="delete" onClick={() => onDelete(item.id)}>
              <Icon name="delete" />
            </span>
            <span onClick={() => onSelect(item)}>
              <Icon name="arrow_forward_ios" type="round" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
