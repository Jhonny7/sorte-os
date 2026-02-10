import { Button, Icon } from "common-lib";
import "./current-location.scss";
import { useEffect, useRef, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationsPresenter from "../LocationsPresenter";


export default function CurrentLocation() {
  const { t, navigate } = LocationsPresenter(); 
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string>("");

  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLocation({ lat, lng });
      reverseGeocode(lat, lng);

      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([lat, lng], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker([lat, lng], { draggable: true })
          .addTo(map)
          .bindPopup(t("locations.add.popup_marker"))
          .openPopup();

        marker.on("dragend", () => {
          const position = marker.getLatLng();
          setLocation({ lat: position.lat, lng: position.lng });
          reverseGeocode(position.lat, position.lng);
        });
      }
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      setAddress(t("common.loading"));
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      if (data && data.name) {
        setAddress(data.display_name);
      } else {
        throw new Error("No se encontró la dirección");
      }
    } catch (error) {
      setAddress(t("common.error"));
      console.error("Error al obtener la dirección:", error);
    }
  };

  return (
    <div className="current-location-container">
      <div>
        <div className="current-location-header">
          <span
            onClick={() => navigate(-1)}
            className="current-location-back-button"
          >
            <Icon name="arrow_back_ios" />
          </span>
          <h1>{t("locations.current.title")}</h1>
        </div>
        <h3>{t("locations.current.your_location")}</h3>
        {location && (
          <p>
            {t("locations.current.location_label")}{" "}
            {address === t("common.error")
              ? t("locations.current.alerts.address_error")
              : address}
          </p>
        )}
      </div>
      <div ref={mapRef} id="map" className="current-map" />
      <Button
        extraClass="ok-button"
        onClick={() => {
          if (address === t("common.error")) {
            alert(
              t("locations.add.alerts.fill_all_fields")
            );
            return;
          } else if (address === t("common.loading")) {
            alert(t("locations.alerts.loading_address"));
            return;
          }
          navigate("/add-address", {
            state: {
              current: true,
              direccion: address,
              lat: location?.lat,
              lng: location?.lng,
            },
          });
        }}
      >
        {t("common.accept")}
      </Button>
    </div>
  );
}
