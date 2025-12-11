"use client";

import { Marker, Popup } from "react-leaflet";

import { Icon } from "leaflet";
import { useLocationStore } from "@/store/location-store";

const userIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [40, 40],
});

export function UserMarker() {
  const locations = useLocationStore((s) => s.locations);

  return (
    <>
      {Object.values(locations).map((user) => (
        <Marker
          key={user.userId}
          position={[user.latitude, user.longitude] as [number, number]}
          icon={userIcon}
        >
          <Popup>
            <strong>{user.userId}</strong>
            <br />
            Lat: {user.latitude}
            <br />
            Lng: {user.longitude}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
