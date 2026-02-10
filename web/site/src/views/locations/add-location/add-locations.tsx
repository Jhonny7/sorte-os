import { Button, Icon, Input } from "common-lib";
import "./add-locations.scss";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import LocationsPresenter from "../LocationsPresenter";

interface Lugar {
  display_name: string;
  lat: string;
  lon: string;
  number?: string;
  suburb?: string;
  road?: string;
  city?: string;
  state?: string;
  country?: string;
}

export default function AddLocation() {
  const [sugerencias, setSugerencias] = useState<Lugar[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_GEOAPIFY_KEY;
  const { t, navigate } = LocationsPresenter();

  const fetchSuggestions = useCallback(async (text: string) => {
    if (!text) return;
    setLoading(true);

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      text
    )}&limit=5&lang=es&filter=countrycode:mx&filter=circle:-98.07248088749476,22.9193603624775370,10000&apiKey=${apiUrl}`;

    let res: any;
    try {
      res = await fetch(url);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }

    const data = await res.json();
    setSugerencias(data.features);
  }, []);

  const debouncedFetch = useMemo(
    () =>
      debounce((query: string) => {
        fetchSuggestions(query);
      }, 500),
    [fetchSuggestions]
  );

  const handleChange = (e: { value: string }) => {
    const value = e.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSeleccion = (lugar: any) => {
    const [lng, lat] = lugar.geometry.coordinates;
    setInput(lugar.properties.formatted);
    setSugerencias([]);
    navigate("/add-address", {
      state: { direccion: lugar.properties.formatted, lat, lng },
    });
  };

  return (
    <div className="add-location-container">
      <div className="add-location-header">
        <span onClick={() => navigate(-1)} className="add-location-back-button">
          <Icon name="arrow_back_ios" />
        </span>
        <h1>{t("locations.search.title")}</h1>
      </div>
      <div className="add-location-tip">
        <div className="add-location-color">
          <Icon name="help" />
          <p>
            {t("locations.search.tip")}
          </p>
        </div>
      </div>
      <div className="add-location-input">
        <Input
          onChange={handleChange}
          onBlur={() => {}}
          index={1}
          inputData={{
            label: t("locations.search.input_label"),
            placeholder: t("locations.search.input_placeholder"),
            type: "text",
            name: "searchAddress",
            value: input,
          }}
        />
        <ul>
          {sugerencias.length === 0 && input && !loading && (
            <li className="p-2 text-gray-500">{t("locations.search.no_results")}</li>
          )}
          {loading && sugerencias.length === 0 && (
            <li className="p-2 text-gray-500">{t("common.loading")}</li>
          )}
          {sugerencias.map((r: any, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSeleccion(r)}
            >
              {r.properties.formatted}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
