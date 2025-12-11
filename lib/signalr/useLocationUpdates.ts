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

    connection.on("ReceiveLocation", (data: LocationUpdateDto) =>
      updateLocation(data)
    );

    // Start only when we have name
    const start = async () => {
      if (connection.state === "Disconnected") {
        await connection.start();
      }

      // 2. DO NOT WATCH GEOLOCATION unless sharing = true
      if (!sharing) return;

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
        { enableHighAccuracy: true }
      );
    };

    start();

    return () => {
      connection.off("ReceiveLocation");

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      connection.stop();
    };
  }, [sharing, name]);
}
