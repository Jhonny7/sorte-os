import { Button, Icon, Input, MenuItem } from "common-lib";
import { useRef, useState, useEffect} from "react";
import "./add-address.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationsPresenter from "../LocationsPresenter";

export default function AddAddress() {
  const { t, location, navigate } = LocationsPresenter();
  const [selectedType, setSelectedType] = useState(t("locations.types.default"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [references, setReferences] = useState("");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const direccion = useRef({
    valor: location.state?.direccion || "sin direccion",
    geoapi: "",
  });
  const [lat, setLat] = useState(location.state?.lat || 22.919360362477537);
  const [lng, setLng] = useState(location.state?.lng || -98.07248088749476);
  const apiUrl = import.meta.env.VITE_GEOAPIFY_KEY;

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiUrl}`
      );
      const data = await response.json();

      if (data && data.features && data.features.length > 0) {
        const direccions = data.features[0].properties.formatted;
        direccion.current.geoapi = direccions;
      } else {
        throw new Error("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  const getLocation = async () => {
    try {
      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([lng, lat], 16);
        mapInstanceRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const maker = L.marker([lat, lng], {})
          .addTo(map)
          .bindPopup(t("locations.add.popup_marker"))
          .openPopup();

        markerRef.current = maker;

        setTimeout(() => {
          map.invalidateSize();
          map.setView([lat, lng], 16);
        }, 100);
      }
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
    }
  };

  useEffect(() => {
    getLocation();
    
    if (!location.state?.current) {
      reverseGeocode(lat, lng);
    }
  }, []);

  interface AddressProps {
    id: number;
    address: string;
    number: string;
    name: string;
    references: string;
    type: string;
    coordinates: { lat: number; lng: number };
  }

  const addressTypes = [
    { label: t("locations.types.house"), icon: "home", value: "casa" },
    { label: t("locations.types.building"), icon: "apartment", value: "edificio" },
    { label: t("locations.types.apartment"), icon: "domain", value: "departamento" },
  ];

  const handleTypeSelect = (type: any) => {
    setSelectedType(type.label);
    setIsDropdownOpen(false);
  };

  const mainItem = {
    label: selectedType,
    icon:
      selectedType === t("locations.types.default")
        ? "location_on"
        : selectedType === t("locations.types.house")
        ? "home"
        : selectedType === t("locations.types.building")
        ? "apartment"
        : "domain",
    onClick: () => setIsDropdownOpen(!isDropdownOpen),
    collapsed: false,
  };

  return (
    <div className="add-Address-container">
      <div ref={mapRef} id="map" className="add-Address-map" />
      <div className="add-Address-Options">
        <div className="dropdown-container">
          <MenuItem
            item={mainItem}
            arrow={isDropdownOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {addressTypes.map((type, index) => (
                <MenuItem
                  key={index}
                  item={{
                    label: type.label,
                    icon: type.icon,
                    onClick: () => handleTypeSelect(type),
                    collapsed: false,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="add-Address-Number">
          {t("locations.add.house_number")}
          <div
            onClick={() => {
              setIsDropdownOpen(false);
            }}
          >
            <Input
              index={1}
              onChange={(e: any) => {
                setNumber(e.value);
              }}
              onBlur={() => {
                if (number < 0) {
                  alert(t("locations.add.negative_number"));
                  setNumber(0);
                  return;
                }

                if (location.state?.current === true) {
                  return;
                }
                const query = `${number} ${direccion.current.geoapi}`;
                const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
                  query
                )}&format=json&apiKey=${apiUrl}`;

                fetch(url)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.results && data.results.length > 0) {
                      const newLat = data.results[0].lat;
                      const newLng = data.results[0].lon;

                      setLat(newLat);
                      setLng(newLng);
                      
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView([newLat, newLng], 16);

                        if (markerRef.current) {
                          markerRef.current.setLatLng([newLat, newLng]);
                          markerRef.current
                            .bindPopup(
                              `Dirección: ${number} ${direccion.current.geoapi}`
                            )
                            .openPopup();
                        }
                      }
                    }
                  })
                  .catch((err) => {
                    console.error("Error al buscar en Geoapify:", err);
                  });
              }}
              inputData={{
                label: t("locations.add.placeholders.address_type"),
                placeholder: t("locations.add.placeholders.house_number"),
                type: "text",
                name: "addressType",
                value: number,
              }}
            />
          </div>
        </div>
      </div>
      <div className="add-Address-Name">
        <div>
          {t("locations.add.house_name")}
          <div
            onClick={() => {
              setIsDropdownOpen(false);
            }}
          >
            <Input
              index={2}
              onChange={(e: any) => setName(e.value)}
              inputData={{
                label: t("locations.add.placeholders.address_type"),
                placeholder: t("locations.add.placeholders.name"),
                type: "text",
                name: "addressType",
                value: name,
              }}
            />
          </div>
        </div>
      </div>
      <div className="add-Address-References">
        <div>
          {t("locations.add.references")}
          <div
            onClick={() => {
              setIsDropdownOpen(false);
            }}
          >
            <Input
              onChange={(e: any) => setReferences(e.value)}
              index={3}
              inputData={{
                label: t("locations.add.placeholders.address_type"),
                placeholder: t("locations.add.placeholders.reference"),
                type: "text",
                name: "addressType",
                value: references,
              }}
            />
          </div>
        </div>
      </div>
      <Button
        extraClass="save-button"
        onClick={() => {
          const id = Date.now();
          const newAddress: AddressProps = {
            id: id,
            address: direccion.current.valor,
            number: number.toString(),
            name: name,
            references: references,
            type: selectedType,
            coordinates: { lat: lat, lng: lng },
          };

          if (
            newAddress.address &&
            newAddress.number &&
            newAddress.name &&
            newAddress.references &&
            newAddress.type !== t("locations.types.default")
          ) {
            const savedAddresses = JSON.parse(
              localStorage.getItem("my-address") || "[]"
            );
            savedAddresses.push(newAddress);
            localStorage.setItem("my-address", JSON.stringify(savedAddresses));
            navigate("/locations");
          } else {
            alert(t("locations.add.alerts.fill_all_fields"));
          }
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="save" type="round" />
          {t("locations.add.save_address")}
        </div>
      </Button>
    </div>
  );
}
