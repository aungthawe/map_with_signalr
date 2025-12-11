"use client";

import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

//import { MapContainer, TileLayer } from "react-leaflet";
import { useLocationUpdates } from "@/lib/signalr/useLocationUpdates";
import { UserMarker } from "./UserMarker";
import { useLocationStore } from "@/store/location-store";
import { LocationUpdateDto } from "@/types/LocationUpdateDto";

export default function RealtimeMap() {
  useLocationUpdates();
  const users: LocationUpdateDto[] = useLocationStore((s) => s.locations);

  return (
    <div className="bg-white/70 rounded-xl shadow-xl p-6 backdrop-blur-lg">
      <h2 className="text-xl font-semibold mb-4">Location Map</h2>

      <div className="h-[550px] rounded-xl overflow-hidden border bg-gradient-to-br from-blue-100 to-cyan-100">
        <MapContainer
          center={[16.7777, 96.1392]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {users.map((u) => (
            <UserMarker key={u.userId} user={u} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
