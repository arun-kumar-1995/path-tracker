import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

// Constants for icon colors
const blueIcon = createIcon("blue");
const redIcon = createIcon("red");
const greenIcon = createIcon("green");

// Constants for the TileLayer URL
const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MapViewUpdater = ({ trajectory }) => {
  const map = useMap();

  useEffect(() => {
    if (trajectory.length > 0) {
      const currentPosition = trajectory[trajectory.length - 1];
      map.setView(currentPosition, map.getZoom());
    }
  }, [trajectory, map]);

  return null;
};

const Map = ({ startPosition, endPosition, trajectory }) => {
  const dashedStyle = { color: "blue", dashArray: "10, 10", weight: 3 };

  return (
    <MapContainer
      center={startPosition}
      zoom={13}
      style={{ height: "calc(100vh - 90px)", width: "100%" }}
    >
      <TileLayer url={TILE_LAYER_URL} />

      <Marker position={startPosition} icon={blueIcon} />
      <Marker position={endPosition} icon={redIcon} />

      {trajectory.length > 0 && (
        <Marker position={trajectory[trajectory.length - 1]} icon={greenIcon} />
      )}

      {trajectory.length > 0 && (
        <Polyline positions={trajectory} pathOptions={dashedStyle} />
      )}

      <MapViewUpdater trajectory={trajectory} />
    </MapContainer>
  );
};

export default Map;
