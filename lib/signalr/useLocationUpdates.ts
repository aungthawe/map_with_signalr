"use client";

import { useEffect } from "react";
import { getSignalRConnection } from "./connection";
import { useLocationStore } from "@/store/location-store";

export function useLocationUpdates() {
  const updateLocation = useLocationStore((s) => s.updateLocations);

  useEffect(() => {
    const connection = getSignalRConnection();

    connection.on("ReceiveLocation", (data) => {
      updateLocation(data);
    });

    // Start connection (only once)
    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => {
          console.log("SignalR connected");

          navigator.geolocation.watchPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;

              if (connection.state === "Connected") {
                connection
                  .invoke("SendLocation", {
                    userId: "Me",
                    latitude: lat,
                    longitude: lng,
                    timestamp: Date.now(),
                  })
                  .catch((err) => console.error("Invoke error:", err));

                console.log("sendLocation completed!", lat, lng, Date.now());
              }
            },
            (err) => console.error("Geolocation error:", err.message),
            { enableHighAccuracy: true }
          );
        })
        .catch((err) => console.error("Connection error:", err));
    }

    return () => {
      connection.off("ReceiveLocation");
    };
  }, []);
}
