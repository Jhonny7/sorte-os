import { useEffect, useRef } from "react";
import "./map.scss";
declare const L: any;

interface MapProps {
  center: [number, number];
  onMove: (coords: [number, number]) => void;
  layer?:string;
}

export default function Map({ center, onMove, layer = "Map data © <a href='https://olamsys.com'>ArSa Consulting</a>" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!(window as any).L || !mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView(center, 15);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: layer
    }).addTo(mapInstance.current);

    markerRef.current = L.marker(center, { draggable: true }).addTo(mapInstance.current);

    markerRef.current.on("dragend", function (e: any) {
      const { lat, lng } = e.target.getLatLng();
      onMove([lat, lng]);
    });

    mapInstance.current.on("click", function (e: any) {
      const { lat, lng } = e.latlng;
      markerRef.current.setLatLng([lat, lng]);
      onMove([lat, lng]);
    });
  }, [center, onMove]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden"
      }}
    />
  );
}
