"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

type Pharmacy = {
  _id: string;
  name: string;
  isOpen: boolean;
  location: { coordinates: [number, number] };
};

function Recenter({ pos }: { pos: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(pos, 14); }, [pos, map]);
  return null;
}

export default function LeafletMap({
  pharmacies,
  userPos,
}: {
  pharmacies: Pharmacy[];
  userPos: [number, number] | null;
}) {
  const defaultCenter: [number, number] =
    userPos ??
    (pharmacies[0]
      ? [pharmacies[0].location.coordinates[1], pharmacies[0].location.coordinates[0]]
      : [47.9184, 106.9177]);

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {userPos && <Recenter pos={userPos} />}
      {userPos && (
        <Marker position={userPos} icon={blueIcon}>
          <Popup>Таны байршил</Popup>
        </Marker>
      )}
      {pharmacies.map((ph) => {
        const [lng, lat] = ph.location.coordinates;
        return (
          <Marker key={ph._id} position={[lat, lng]} icon={ph.isOpen ? greenIcon : redIcon}>
            <Popup>{ph.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
