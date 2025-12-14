"use client";

import { useEffect, useRef } from "react";
import { getSignalRConnection } from "./connection";
import { useLocationStore } from "@/store/location-store";
import { LocationUpdateDto } from "@/types/LocationUpdateDto";

export function useLocationUpdates(sharing: boolean) {
  const updateLocation = useLocationStore((s) => s.updateLocations);
  const name = useLocationStore((s) => s.name);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. DO NOT CONNECT until name is set
    if (!name) return;

    const connection = getSignalRConnection();

    connection.on("ReceiveInitialLocations", (list: LocationUpdateDto[]) => {
      list.forEach(updateLocation);
    });

    connection.on("ReceiveLocation", (data: LocationUpdateDto) =>
      updateLocation(data)
    );

    const start = async () => {
      if (connection.state === "Disconnected") {
        await connection.start();
      }

      if (!sharing) {
        console.log("Not sharing location, skipping watch");
        return;
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          if (connection.state === "Connected") {
            connection.invoke("SendLocation", {
              userId: `${name}`,
              latitude: lat,
              longitude: lng,
              timestamp: Date.now(),
            });
          }
        },
        (err) => console.error("Geolocation error:", err.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    };

    start();

    return () => {
      connection.off("ReceiveLocation");

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      useLocationStore.getState().clearLocations();

      connection.stop();
    };
  }, [sharing, name]);
}
