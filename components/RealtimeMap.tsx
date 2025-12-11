"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useLocationUpdates } from "@/lib/signalr/useLocationUpdates";
import { UserMarker } from "./UserMarker";

export default function RealtimeMap() {
  return (
    <MapContainer
      center={[16.8409, 96.1735]} // Yangon
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" /> */}
      {/* <TileLayer url="https://stamen-tiles-{s}{z}/{x}/{y}.png" /> */}

      <UserMarker />
    </MapContainer>
  );
}
