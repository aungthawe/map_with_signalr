"use client";

import dynamic from "next/dynamic";

const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

const L = typeof window !== "undefined" ? require("leaflet") : null;


// import L from "leaflet";
import { LocationUpdateDto } from "@/types/LocationUpdateDto";

export function UserMarker({ user }: { user: LocationUpdateDto }) {
  const icon = L.divIcon({
    className: "custom-user-marker",
    html: `
      <div style="
        height: 36px; width: 36px;
        background: #6a6ee8;
        color: white; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border-radius: 50%;
        font-weight: bold;">
        ${user.userId[0].toUpperCase()}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  return (
    <Marker position={[user.latitude, user.longitude]} icon={icon}>
      <Popup>
        <b>{user.userId}</b>
        <br />
        {user.latitude.toFixed(4)}, {user.longitude.toFixed(4)}
      </Popup>
    </Marker>
  );
}
